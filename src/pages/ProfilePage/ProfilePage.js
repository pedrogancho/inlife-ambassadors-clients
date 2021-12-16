import axios from "axios"
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
// import styles from "./ProfilePage.scss";
const authToken = localStorage.getItem("authToken");
function ProfilePage() {
    const [imageUrl, setImageUrl] = useState(""); // <-- used for image upload input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [allowSubmit, setAllowSubmit] = useState(false);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api/users/current`,
                    { headers: { Authorization: `Bearer ${authToken}` } }
                );
                const oneUser = response.data;
                console.log(response.data);
                setName(oneUser.name);
                setEmail(oneUser.email);
                setImageUrl(oneUser.image);
            } catch (error) {}
        };
        fetchData();
    }, []);
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const updatedUser = {
                name: name,
                email: email,
                password: password,
                image: imageUrl,
            };
            const response = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/api/user/current`,
                updatedUser,
                {
                    headers: { Authorization: `Bearer ${authToken}` },
                }
            );
            setUser(response.data);
            navigate("/profile");
        } catch (error) {}
    };
    return (
        <div className="ProfilePage">
            <h1>Edit your profile data</h1>
            <div className="ProfilePage-container">
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleEmail}
                            readOnly
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePassword}
                        />
                        <label>Name:</label>
                        <input type="text" name="name" value={name} onChange={handleName} />
                        <img src={imageUrl} width="100px" alt="" />
                        <button type="submit" disabled={allowSubmit}>
                            Update Profile
                        </button>
                    </div>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}
export default ProfilePage;









