const os = require('os');
const cluster = require('cluster')

// console.log(os.platform());
// console.log(os.arch());
// console.log(os.cpus());
// console.log(os.cpus().length); //Количество ядер

if(cluster.isMaster){   //Является ли єтот процесс главным
    for(let i = 0; i < os.cpus().length - 1; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker) => {
        console.log(`Воркер с pid = ${worker.process.pid} умер`)
        cluster.fork()
    })
}else {
    console.log(`Воркер pid = ${process.pid} запущен`)

    setInterval(() => {
        console.log(`Воркер pid = ${process.pid} запущен`)
    }, 5000)
}