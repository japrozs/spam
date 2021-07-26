# Procedure to create new features on workflow

-   Firstly, create a new branch using the following command

```bash
git checkout -b <feature_name>
```

-   Then, code out the feature and push it through the following command

```bash
git add .
git commit -m <commit_msg>
git push -u origin <branch_name>
```

-   Then go to `github.com` and `create a pull request`

## Merge the changes into `prod`

If the features is completed coded out, its time to deploy it! To deploy it, use the following commands

```bash
git pull origin develop
git add .
git push
git commit -m "update prod branch"
```

## After this, the changes will be deployed to the hosting provider
