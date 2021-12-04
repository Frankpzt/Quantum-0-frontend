function isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
}

function logout(): void {
    localStorage.removeItem("token");
}

export { isAuthenticated, logout };
