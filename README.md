# Spam - a new way to publish your thoughts to other people inboxes

# Pass

Pass is an app that helps you find something to do when you're feeling bored. Just create an account, find an event and join millions of other people like you.

# Folder structure

| Folder             | Description                                     |
| ------------------ | ----------------------------------------------- |
| [dodge](dodge)     | The web app built with `next.js`                |
| [nissan](nissan)   | The `graphQL` server built with `express`       |
| [scripts](scripts) | Scripts regarding deployment and docker config. |
| [.github](.github) | Github settings config. (eg. `CODEOWNERS`)      |
| [.vscode](.vscode) | Project settings for `VSCode`                   |

## How to start the app

To run the app, follow the steps given below:

```bash
git clone https://github.com/japrozs/spam.git
cd spam
cd nissan
yarn install
yarn watch
# create a new terminal window and type
cd nissan
yarn dev
# create a new terminal window and type
cd dodge
yarn dev
```

### Change the environment variables

After these commands, the app will run on localhost:3000/
