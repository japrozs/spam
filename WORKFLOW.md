## Doc : `https://git-flow.readthedocs.io/en/latest/releases.html`

# Procedure to create new features on workflow

We use git flow to manage all the branches for easier integrationg with github.

## To contribute

Firstly, install `git-flow` and then run the following commands in your terminal on the `develop` branch only:

```bash
git flow feature start <feature_name>
```

After coding out the feature, use the following commands to publish the changes

```bash
git add .
git commit -m <commit_msg>
git flow feature finish <feature_name>
git checkout develop
git push
```
