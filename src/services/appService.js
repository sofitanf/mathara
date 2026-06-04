export async function exitGame() {
    const Capacitor = window.Capacitor;

    // jika browser biasa
    if (!Capacitor) {
        alert("Tutup aplikasi untuk keluar");
        return;
    }

    const platform = Capacitor.getPlatform();

    // android
    if (platform === "android") {
        await Capacitor.Plugins.App.exitApp();
        return;
    }

    // ios / web
    alert("Tutup aplikasi untuk keluar");
}
