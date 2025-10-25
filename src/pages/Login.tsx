import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Paper,
    TextField,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";
import { _post } from "../../bff/clients/apiChessHubCoreClient.ts";

export function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loginUser = async () => {
        setLoading(true);
        setError("");
        const payload = { usernameOrEmail: emailOrUsername, password };

        try {
            const response = await _post("/auth/login", payload);
            // ✅ Handle success (redirect or store token)
            console.log("Login success:", response);
            navigate("/uploadImage");
        } catch (err) {
            setError("Invalid credentials. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Header */}
            <AppBar
                position="static"
                color="transparent"
                elevation={1}
                className="border-b border-gray-200 backdrop-blur-md"
            >
                <Toolbar className="flex justify-between items-center max-w-7xl mx-auto w-full px-4">
                    <Typography
                        variant="h5"
                        component={Link}
                        to="/"
                        className="font-bold text-gray-800 no-underline hover:text-indigo-600 transition-colors"
                    >
                        ChessHub
                    </Typography>
                    <Box className="flex space-x-4">
                        <Button
                            component={Link}
                            to="/auth/register"
                            variant="outlined"
                            color="primary"
                            className="rounded-xl"
                        >
                            Register
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Login Card */}
            <Container className="flex-grow flex justify-center items-center py-12">
                <Paper
                    elevation={4}
                    className="p-10 rounded-2xl max-w-md w-full bg-white/70 backdrop-blur-md shadow-lg"
                >
                    <Typography
                        variant="h4"
                        className="text-center font-bold text-gray-800 mb-6"
                    >
                        Login
                    </Typography>

                    {error && (
                        <Alert severity="error" className="mb-4">
                            {error}
                        </Alert>
                    )}

                    <Box className="space-y-4">
                        <TextField
                            fullWidth
                            label="Email or Username"
                            variant="outlined"
                            value={emailOrUsername}
                            onChange={(e) => setEmailOrUsername(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={loginUser}
                        disabled={loading}
                        className="mt-6 py-2 rounded-xl"
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                    </Button>

                    <Typography
                        variant="body2"
                        className="text-center text-gray-600 mt-6"
                    >
                        Don't have an account?{" "}
                        <Link
                            to="/auth/register"
                            className="text-indigo-600 hover:underline"
                        >
                            Register here
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}