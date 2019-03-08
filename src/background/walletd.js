
import { join } from 'path'
import { execFile } from 'child_process'
import fs from 'fs'

const EXECUTABLE_NAME = getExecutableName()

export default class Walletd {
    constructor(app) {
        this.walletFolderPath = app.getPath('userData')
        this.asarExecutablePath = join(__static, EXECUTABLE_NAME)
        this.executableFolderPath = join(app.getPath('temp'), 'walletd')
        this.executablePath = join(this.executableFolderPath, EXECUTABLE_NAME)
        this.process = null
    }

    async launch() {
        try {
            fs.mkdirSync(this.executableFolderPath)
        } catch (e) {
            if (e.code !== 'EEXIST') throw e
        }
        try {
            fs.copyFileSync(this.asarExecutablePath, this.executablePath)
        } catch (e) {
            // This error happen in dev mode when hot reloading
            if (e.code !== 'ETXTBSY') throw e
        }
        fs.chmodSync(this.executablePath, 0o744)
        this.start()
    }

    start(name) {
        const walletLocation = this.getWalletLocation(name)

        this.process = execFile(this.executablePath, ['-w', walletLocation], (error, stdout, stderr) => {
            if (error) {
                throw error
            }
            console.log(stderr)
            console.log(stdout)
        })
    }

    stop() {
        if (this.process) {
            this.process.kill()
        }
    }

    getWalletLocation(name) {
        const walletLocation = join(this.walletFolderPath, name || 'default-wallet')

        if (!fs.existsSync(walletLocation)) {
            fs.writeFileSync(walletLocation, '')
        }

        return walletLocation
    }
}

function getExecutableName() {
    switch (process.platform) {
        default:
            return 'factom-walletd'
    }
}