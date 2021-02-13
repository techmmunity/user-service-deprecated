Run project:

```
yarn docker
```

Resolve Volume Conflicts When a New Lib Is Added:

```
docker container rm user_api && docker volume rm user_nodemodules
```
