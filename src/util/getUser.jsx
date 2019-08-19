import jwtDecode from 'jwt-decode';

export function getUser () {
    try {
        const token = localStorage.getItem("token");
        const {_email, _id, _role, _info} = jwtDecode(token);

        const user = {
            user_id: _id,
            info_id: _info,
            email: _email,
            role: _role
        };

        return user;
    }
    catch (err) {

    }

};

export function getToken() {
    const token = localStorage.getItem("token");
    return token;
}