const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

console.log(
  chalk.blue(
    figlet.textSync('Receiptify', { horizontalLayout: 'full' })
  )
);
console.log(chalk.blue('(C) Matt Milan - 2021'));
console.log('');

module.exports = {
  askQuestions: () => {
    const questions = [
      {
        name: 'version',
        type: 'list',
        message: 'Select which receipt you wish to fill in?',
        choices: [
          'mcdonalds',
          'tacobell',
          'burgerking'
        ]
      },
      {
        name: 'code',
        type: 'input',
        message: 'Enter your receipt code:',
        validate: (code) => {
          const split = code.split('-');
          if (split.length !== 3 || code.length !== 14) {
            return 'Invalid Receipt Code Provided.'
          }
          return true;
        }
      },
      {
        name: 'email',
        type: 'input',
        message: 'Enter your email (to send code too):',
        validate: (email) => {
          return /\S+@\S+\.\S+/.test(email) ? true : 'Please enter a valid email'
        }
      }

    ];

    return inquirer.prompt(questions);
  }
}