window.userAddress = null;
/*進入網頁即連接錢包
window.onload = async () => {
    // Init Web3 connected to ETH network
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    } else {
        alert("No ETH brower extension detected.");
    }
    // Load in Localstore key
    window.userAddress = window.localStorage.getItem("userAddress");
    showAddress();
};

 */
/*尚未完工
function truncateAddress(address) {
    if (!address) {
        return "";
    }
    return `${address.substr(0, 5)}...${address.substr(
        address.length - 5,
        address.length
    )}`;
}

// Display or remove the users know address on the frontend
function showAddress() {
    if (!window.userAddress) {
        document.getElementById("userAddress").innerText = "";
        document.getElementById("logoutButton").classList.add("hidden");
        return false;
    }

    document.getElementById(
        "userAddress"
    ).innerText = `ETH Address: ${truncateAddress(window.userAddress)}`;
    document.getElementById("logoutButton").classList.remove("hidden");
}

// remove stored user address and reset frontend
function logout() {
    window.userAddress = null;
    window.localStorage.removeItem("userAddress");
    showAddress();
}

async function loginwithwallet() {
    if (window.web3) {
        try {
            const selectedAccount = await window.ethereum
                .request({
                    method: "eth_requestAccounts",
                })
                .then((accounts) => accounts[0])
                .catch(() => {
                    throw Error("No account selected!");
                });
            window.userAddress = selectedAccount;
            window.localStorage.setItem("userAddress", selectedAccount);
            showAddress();
        } catch (error) {
            console.error(error);
        }
    } else {
        alert("沒有讀取到錢包擴充元件");
    }
}


尚未完工 */