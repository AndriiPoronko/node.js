//Readable - чтение
//Writable - запись
//Duplex - для чтения и записи
//Transform - такой же как Duplex, но может изменить данные по мере чтения

const fs = require('fs');
const path = require('path');
const http = require('http');

// fs.readFile(path.resolve(__dirname, 'test.txt'), (err, data) => {
//     if(err){
//         throw err;
//     }
//     console.log(data)
// })

const stream = fs.createReadStream(path.resolve(__dirname, 'test.txt'));
//Один чанк по дефолту 64кб
stream.on('data', (chunk) => {
    console.log(chunk);
})
stream.on('end', () => console.log('Закончили читать'))
stream.on('open', () => console.log('Начали читать'))
stream.on('error', (e) => console.log(e))

const writableStream = fs.createWriteStream(path.resolve(__dirname, 'test2.txt'))
for( let i = 0; i <= 20; i++){
    writableStream.write(i + '\n')
}
writableStream.end();
writableStream.close();
writableStream.destroy();
writableStream.on('error')

http.createServer((req, res) => {
    // req - readable stream
    // res - writable stream
    const stream = fs.createReadablrStream(path.resolve(__dirname, 'test.txt'))

    //Стрим закончит раньше читать, чем пользователь скачает
    // stream.on('data', (chunk) => res.write(chunk))
    // stream.on('close', (chunk) => res.end())

    stream.pipe(res)
})