import React from "react";

const Form = ({ user, setUser, submitForm, submitLabel }) => {
    // Ensure user object has default properties to avoid inputs being uncontrolled initially
    const getUserProp = (prop) => user && user[prop] ? user[prop] : '';

    return (
        <form onSubmit={submitForm}>
            <div className="form-group my-3">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" onChange={(e) => setUser({ ...user, firstName: e.target.value })} value={ getUserProp('firstName') } />
            </div>

            <div className="form-group my-3">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" onChange={(e) => setUser({ ...user, lastName: e.target.value })} value={ getUserProp('lastName') } />
            </div>

            <div className="form-group my-3">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" onChange={(e) => setUser({ ...user, email: e.target.value })} value={ getUserProp('email') } />
            </div>

            <div className="form-group my-3">
                <label htmlFor="nickname">Nickname</label>
                <input type="text" className="form-control" id="nickname" name="nickname" onChange={(e) => setUser({ ...user, nickname: e.target.value })} value={ getUserProp('nickname') } />
            </div>

            <div className="form-group my-3">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} value={ getUserProp('password') || '' } /> {/* Password might be intentionally left undefined for privacy/security */}
            </div>

            <div className="form-group my-3">
                <label htmlFor="avatar">Avatar</label>
                <input type="file" className="form-control" id="avatar" name="avatar" onChange={(e) => setUser({ ...user, avatar: e.target.files[0] })} />
            </div>

            <button type="submit" className="btn btn-primary">
                { submitLabel }
            </button>
        </form>
    );
};

export default Form;
