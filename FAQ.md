# F.A.Q. Of This Repository

## I'm having some trouble with docker

### Have any new libraries been installed recently?

Try to run:

```sh
yarn docker:clear
yarn docker
```

## Migrations

### How do I create a new migration?

- Run `yarn docker` to update your local database
- Code the new entity (Look to the \*.entity.ts files for some examples) or make the changes in an already existent entity
- In another terminal, run `yarn docker db` and keep it running
- Run `yarn migration:generate <MIGRATION_NAME>`
- Kill the "`yarn docker db`" terminal

**WARNING:** Always check your migrations! Don't trust, verify!

## Enviroment Variables

### How to add a new enviroment variable?

- Update the `src/types/env.d.ts` with the new variable (all variables must have the `string` type)
- Add the new env var in to `.env.docker` file (env vars with sensitive content **MUST** have no value, just the key or an example non-real value)

## Validation

### How do I create a new custom validator in yup?

- Create a new folder `src/<API_VERSION>/utils/yup/(string, number, date, ...)`
- Create a new file, inside this new folder, with the name of your new custom validator
- If there aren't any custom validator to use as example in this repo, look in another of Techmmunity repositories.
- Create the custom validator
- Import the custom validator in `src/<API_VERSION>/utils/yup/index.ts` file
- Add the new typing in `src/types/env.d.ts` file (if the file doesn't exists, look in another of Techmmunity repositories for some examples)

## Api

### How do I create a new api version?

- Create a new folder with the correspondent version name (v2, v3, ...)
- Create a new module file for this version `<API_VERSION>.module.ts` inside the new folder
- Import this new module inside the `src/app.module.ts` folder
- Copy the index config of the previous version to the new version config folder
- Copy the database config of the previous version to the new version config folder, or create a new one
- Include the database connection configuration in the `<API_VERSION>.module.ts` file
- Update the api version inside the `nest-cli.json` file
- Update the api version in the scripts of `package.json`
- Update the api version inside the `src/swagger.ts` file

**WARNING:** DON'T DUPLICATE FILES! Only create new files or import the files of the previous version if needed.

### How do I create a new entity?

- Install the nest cli globally with `yarn global add @nestjs/cli`
- Run this command: `nest g mo <ENTITY_NAME>`
- Run this command: `nest g co <ENTITY_NAME>`
- Run this command: `nest g s <ENTITY_NAME>`
- The new entity will be created inside the `src/<API_VERSION>/api` folder
- The module of the new entity will be automatically import inside the `src/<API_VERSION>/<API_VERSION>.module.ts` file. You **must** remove it.
- Import the module of the new entity inside the `src/<API_VERSION>/api/index.ts` file and add it to the array of modules.
- Delete the `src/<API_VERSION>/api/<ENTITY_NAME>/<ENTITY_NAME>.controller.spec.ts` file
- Delete the `src/<API_VERSION>/api/<ENTITY_NAME>/<ENTITY_NAME>.service.spec.ts` file
- Add `@ApiTag` decorator in the controller of the new entity
- Change the base url of the controller of the new entity to contain the api version (ApiConfig.version)
- Save the file of the controller of the new entity to prettier automatilly format the file
- Save the file of the module of the new entity to prettier automatilly format the file
