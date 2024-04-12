import React, { useState } from "react";

function Signin({ onRouteChange, loadUser}) {
    const [users, setusers] = useState({email: '', password: ''});

    const onEmailchange = (event)=>{
        setusers({
            ...users,
            email: event.target.value
        })
    }
    const onPasswordchange = (event)=>{
        setusers({
            ...users,
            password: event.target.value
        })
    }
    const onSubmitchange = (e) => {
        e.preventDefault();
        console.log(users);
    
    
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                // It seems like 'users' should be an object, make sure it's defined correctly
                email: users.email,
                password: users.password
            })
        })
        .then(response => response.json())
        .then(users =>{
            if(users.id){
                loadUser(users);
                onRouteChange('home');
            }
        })
        .catch(error => {
            // Handle any network or fetch-related errors here
            console.error('Fetch Error:', error);
        });
    };
    return(
        <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={onEmailchange}/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={onPasswordchange}/>
                    </div>
                    </fieldset>
                    <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={onSubmitchange}/>
                    </div>
                    <div className="lh-copy mt3">
                    <p className="f6 link dim black db pointer" onClick={()=> onRouteChange('register')}>Register</p>
                    </div>
                </form>
            </main>
        </article>
    );
}

export default Signin;