import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ModelFocus from "./pages/ModelFocus";
import BookTestDrive from "./pages/BookTestDrive";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import JobApplication from "./pages/JobApplication";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Navbar />
                    <main style={{ flex: 1 }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/bike/:id" element={<ModelFocus />} />
                            <Route
                                path="/book-test-drive"
                                element={<BookTestDrive />}
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route
                                path="/privacy"
                                element={<PrivacyPolicy />}
                            />
                            <Route path="/terms" element={<TermsOfService />} />
                            <Route
                                path="/apply-job"
                                element={<JobApplication />}
                            />
                        </Routes>
                    </main>
                    <Footer />
                    <ScrollToTop />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
