# Projects
Projects

### Extensions

### Commands to Get Started Examples

#### Yarn

From within the folder that contains the `package.json` file.

```bash
yarn install
```

Then you execute:

```bash
yarn start
```


### Already Installed Into This Application

The following modules are already installed

#### bootstrap

- https://getbootstrap.com/

This module provide the HTML/CSS and JS Framework that drive the foundational aspects of the UI.

##### reactstrap

This is a React wrapper for Boostrap. It is optional to use this and we recommend you use bootstrap directly when possible.

##### axios

This library is used to make Ajax requests to a server.

##### react-router

The module we use to make client side routing possible

##### toastr

- https://github.com/CodeSeven/toastr

This is to be used to provide informational messages to the user. For example in the following situations:

- "You have logged in successfully"
- "You have created a record"
- "You have uploaded a file"

##### sweetalert

- https://sweetalert.js.org/guides/#using-with-libraries

Alerts are very obtrusive so they should not be used every time you want to provide feedback to a user. Instead use them when you want to confirm the user wants to perform an action or when you want to give a user a choice of actions.

A great example is when a user clicks a "Delete" button. Instead of just moving forward with a delete operation, "Alert" them to confirm that they DO, in fact, want to _DELETE_ the record.

##### rc-pagination

- https://github.com/react-component/pagination

This tool provide for you a ready to use component to draw a pagination tool to use to navigation from page to page, go "next" and "previous". **_Read more_ below.**

##### Using rc-pagintation

Once you are ready to do pagination in React you should use the library installed already called rc-pagination.

For more on using this go to he documentation:

- https://github.com/react-component/pagination

_It is very important that you import the css file to use this library_

To import the css file add to the top of the component:

```javascript
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
```

Here is stubbed out snippet where you still have to proivde much of the logic. Be sure to look at the documention so that you can determine what other properties you need to use.

````javascript
export default class App extends React.Component {
  state = {
    current: 3,
  };

  onChange = page => {
    console.log(page);
    this.setState({
      current: page,
    });
  };

  render() {
    return (
      <Pagination
        onChange={this.onChange}
        current={this.state.current}
        total={25}
        locale={locale}
      />
    );
  }
}```
````
