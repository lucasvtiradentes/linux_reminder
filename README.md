<a name="TOC"></a>

<h3 align="center">
  LINUX REMINDER
</h3>

<div align="center">
  <a href="https://www.npmjs.com/package/linux_reminder"><img src="https://img.shields.io/npm/v/linux_reminder.svg?style=flat" alt="npm version"></a>
  <a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/made%20with-node-1f425f?logo=node.js&.svg" /></a>
  <a href="https://github.com/lucasvtiradentes/linux_reminder#contributing"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" alt="contributions" /></a>
</div>

<p align="center">
  <a href="#dart-features">Features</a> • <a href="#warning-requirements">Requirements</a> • <a href="#bulb-usage">Usage</a> • <a href="#wrench-development">Development</a> • <a href="#books-about">About</a> • <a href="#family-community">Community</a>
</p>

<details>
  <summary align="center"><span>see <b>table of content</b></span></summary>
  <p align="center">
    <ul>
      <li><a href="#trumpet-overview">Overview</a></li>
      <li><a href="#motivation">Motivation</a></li>
      <li><a href="#dart-features">Features</a></li>
      <li><a href="#warning-requirements">Requirements</a></li>
      <li>
        <a href="#bulb-usage">Usage</a>
        <ul>
          <li><a href="#available-configs-options">Available configs options</a></li>
          <li><a href="#available-cli-options">Available CLI options</a></li>
        </ul>
      </li>
      <li>
        <a href="#wrench-development">Development</a>
        <ul>
          <li><a href="#development-setup">Development setup</a></li>
          <li><a href="#used-technologies">Used technologies</a></li>
        </ul>
      </li>
      <li>
        <a href="#books-about">About</a>
        <ul>
          <li><a href="#license">License</a></li>
        </ul>
      </li>
    </ul>
  </p>
</details>

<a href="#"><img src="./.github/images/divider.png" /></a>

## :trumpet: Overview

Schedule daily reminders easily with a simple config file. Organize and receive alerts for important tasks efficiently.

<div align="center">
  <table>
    <tr>
      <td>
        <a href="#"><img width="400px" src="./.github/images/notification.png" /></a>
      </td>
      <td>
        <a href="#"><img width="400px" src="./.github/images/notification_alt.png" /></a>
      </td>
    </tr>

  </table>
</div>

## :question: Motivation

My primary motivation for developing this tool was to ensure I don't miss my main daily tasks, such as those related to nutrition, due to being overly focused on work.

> :warning: **warning**: The reason I opted for the `at` command to schedule tasks, instead of the popular `crontab`, was because the latter couldn't properly execute the `spd-say` and `notify-send` commands. Despite searching for about 2 hours, I didn't find a successful solution.

## :dart: Features<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

&nbsp;&nbsp;&nbsp;✔️ type safe api methods by using [zod](https://github.com/colinhacks/zod) validation;<br>
&nbsp;&nbsp;&nbsp;✔️ three ways to specify task frequency: `weekday`, `weekend` or `everyday`;<br>
&nbsp;&nbsp;&nbsp;✔️ option to speach the name of the task;<br>
&nbsp;&nbsp;&nbsp;✔️ option to choose the notification style between: `notify-send` or `zenity`.<br>

## :warning: Requirements<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

In order to use this project in your computer, you need to have the following items:

- [npm](https://www.npmjs.com/): To install the package. Npm is installed alongside nodejs;
- [nodejs](https://nodejs.org/en/): To actually run the package.
- [at](https://linuxize.com/post/at-command-in-linux/): To schedule the tasks to run on specified times.
- [zenity](https://howtoinstall.co/package/zenity): to show custom notifications (optional).

## :bulb: Usage<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

First, make sure to install the `at` command on linux, which will be used to schedule the reminders:

```bash
sudo apt install at
```

Install the linux_reminder npm package:

```bash
# Install the package
npm install linux_reminder -g
```

Create a reminder configs file such as this (which follows [this schema](./src/schemas/configs.schema.ts)):

```json
{
  "options": {
    "playTextToSpeech": true
  },
  "reminders": [
    {
      "name": "launch",
      "category": "NUTRITION",
      "time": "13:15",
      "days": "everyday"
    },
    {
      "name": "shutdown PC",
      "category": "habits",
      "time": "23:00",
      "days": "everyday"
    }
  ]
}
```

After that, open a terminal and paste this:

```bash
echo $(which node) $(which linux_reminder)
# /home/lucasvtiradentes/.nvm/versions/node/v18.19.0/bin/node /home/lucasvtiradentes/.nvm/versions/node/v18.19.0/bin/linux_reminder
```

Get the above command result and join with the `-s path_of_your_config.json`, in my case it would be:

```bash
/home/lucasvtiradentes/.nvm/versions/node/v18.19.0/bin/node /home/lucasvtiradentes/.nvm/versions/node/v18.19.0/bin/linux_reminder -s "/home/lucasvtiradentes/Desktop/configs.json"

# tip: make sure to specify the absolute path, do not use $USER/Desktop or ~/Desktop
```

Finally you can copy the above command and past it on a new instance of Ubuntu's `Startup Applications`.

<div align="center">
  <a href="#"><img height="400px" src="./.github/images/startup_applications.png" /></a>
</div>

And thats it! Now everytime your Ubuntu startup, it will setup all the current day's reminders!

### Available configs options

```json
{
  "playTextToSpeech": true,
  "useZenitAsNotifierSender": false,
  "notificationExpireSeconds": 1000
}
```

Notice that if you specify to use `zenity`, you'll need to have it installed.

### Available CLI options

```bash
Usage: linux_reminder [options]

⏰ simple crontab based reminder designed to be used in daily tasks on linux.

Options:
  -V, --version       output the version number
  -s, --setup <file>  setup the reminders to run on the specified datetimes
  -r, --remove        remove all configured reminders
  -l, --list          list all configured reminders
  -h, --help          display help for command
```

## :wrench: Development<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

### Development setup

To setup this project in your computer, download it in this link or run the following commands:

```bash
# Clone this repository
$ git clone https://github.com/lucasvtiradentes/linux_reminder

# Go into the repository
$ cd linux_reminder
```

After download it, go to the project folder and run these commands:

```bash
# Install dependencies using npm
$ npm install

# Run the typescript code in development mode
$ npm run dev
```

If you want to contribute to the project, after you make the necessary changes, run these commands to check if everything is working fine:

```bash
# Compile the code into javascript
$ npm run build

# Run the compiled code in production mode
$ npm run start
```

### Used technologies

This project uses the following thechnologies:

<div align="center">
  <table>
    <tr>
      <th>Scope</th>
      <th>Subject</th>
      <th>Technologies</th>
    </tr>
    <tr>
      <td rowspan="1">Project</td>
      <td>Main</td>
      <td align="center">
        <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white"></a>
        <a target="_blank" href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <td rowspan="3">Setup</td>
      <td>Code linting</td>
      <td align="center">
        <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/prettier-1A2C34?logo=prettier&logoColor=F7BA3E"></a>
        <a href="https://github.com/eslint/eslint"><img src="https://img.shields.io/badge/eslint-3A33D1?logo=eslint&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <!-- <td rowspan="3">Setup</td> -->
      <td>Commit linting</td>
      <td align="center">
      <a target="_blank" href="https://github.com/conventional-changelog/commitlint"><img src="https://img.shields.io/badge/commitlint-red?logo=commitlint&logoColor=white"></a>
      <a target="_blank" href="https://github.com/commitizen/cz-cli"><img src="https://img.shields.io/badge/commitizen-pink?logo=conventionalcommits&logoColor=white"></a>
      <!-- <a href="https://gitmoji.dev"><img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji"/></a> -->
      </td>
    </tr>
    <tr>
      <!-- <td rowspan="1">Setup</td> -->
      <td>Other</td>
      <td align="center">
        <a href="https://editorconfig.org/"><img src="https://img.shields.io/badge/Editor%20Config-E0EFEF?logo=editorconfig&logoColor=000"></a>
        <a target="_blank" href="https://github.com/typicode/husky"><img src="https://img.shields.io/badge/🐶%20husky-green?logo=husky&logoColor=white"></a>
        <!-- <a target="_blank" href="https://github.com/okonet/lint-staged"><img src="https://img.shields.io/badge/🚫%20lint%20staged-yellow?&logoColor=white"></a> -->
      </td>
    </tr>
  </table>
</div>

<a href="#"><img src="./.github/images/divider.png" /></a>

## :books: About<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

## License

This project is distributed under the terms of the MIT License Version 2.0. A complete version of the license is available in the [LICENSE](LICENSE) file in this repository. Any contribution made to this project will be licensed under the MIT License Version 2.0.

<a href="#"><img src="./.github/images/divider.png" /></a>

<div align="center">
  <p>
    <a target="_blank" href="https://www.linkedin.com/in/lucasvtiradentes/"><img src="https://img.shields.io/badge/-linkedin-blue?logo=Linkedin&logoColor=white" alt="LinkedIn"></a>
    <a target="_blank" href="mailto:lucasvtiradentes@gmail.com"><img src="https://img.shields.io/badge/gmail-red?logo=gmail&logoColor=white" alt="Gmail"></a>
    <a target="_blank" href="https://discord.com/users/262326726892191744"><img src="https://img.shields.io/badge/discord-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
    <a target="_blank" href="https://github.com/lucasvtiradentes/"><img src="https://img.shields.io/badge/github-gray?logo=github&logoColor=white" alt="Github"></a>
  </p>
  <p>Made with ❤️ by <strong>Lucas Vieira</strong></p>
  <p>👉 See also all <a href="https://github.com/lucasvtiradentes/lucasvtiradentes/blob/master/portfolio/PROJECTS.md#TOC">my projects</a></p>
  <p>👉 See also all <a href="https://github.com/lucasvtiradentes/my-tutorials#readme">my articles</a></p>
</div>
