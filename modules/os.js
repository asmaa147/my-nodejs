const os = require('os');

const currentOS = {
    EOL: os.EOL,
    arch: os.arch(),
    constants: os.constants,
    cpus: os.cpus(),
    devNull: os.devNull,
    endianness: os.endianness(),
    freemem: os.freemem(),
    getPriority: os.getPriority(),
    hostname: os.hostname(),
    loadavg: os.loadavg(),
    tmpdir: os.tmpdir(),
    uptime: os.uptime(),
    version: os.version(),
    userInfo: os.userInfo(),
    uptime: os.uptime(),
}
console.log('currentOS >>> ', currentOS)