import React, { useState, Component } from "react";
import { axiosInstance } from "../services";
import Input from "../components/Input/Input"

class Signup extends Component{

  constructor(props){
    super(props)
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: ""
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
  const { history } = this.props
  const { name, email, password, errors } = this.state
 
  const validateForm = () => {
    let errors = { password: [] };

    if (password < 8) {
      errors.password.push("Password must be 8 characters");
    }
    if (password.toLowerCase() === password) {
      errors.password.push("Password must have at least 1 uppercase character");
    }

    return errors;
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const errors = validateForm();
        if (errors.password.length > 0) {
          this.setState({errors});
          return;
        }

        axiosInstance
          .post("/api/users", {
            name,
            email,
            password,
            account_type: "1"
          })
          .then(res => {
            history.push("/profile", { id: res.data.id });
          })
          .catch(err => {
            //TODO: handle error and provide error message and clear form
            // console.log(err.response.data.errors);
            let errorResponse = err.response.data.errors; 
            console.log(errorResponse);
            Object.keys(errorResponse).map((key, index) => {
              const errors = {...this.state.errors}
    
              this.setState({
                errors: {...errors, [key]: errorResponse[key]},
                name: "",
                email: "",
                password: ""
              })
            });
          });
      }}
    >

      <h2>Sign up</h2>
      <Input
        errors={errors['name'] || []}
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={this.handleChange}
      />
      <Input
        errors={errors['email'] || []}
        type="text"
        placeholder="email"
        name="email"
        value={email}
        onChange={this.handleChange}
      />
      <Input
        errors={errors.password || []}
        type="password"
        placeholder="password"
        name="password"
        value={password}
        onChange={this.handleChange}
      />
      <button type="submit"> SUBMIT </button>
    </form>
  );
    }
}

export default Signup
