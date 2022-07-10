const fs = require('fs')
const path = require('path')

//Создание папки
// fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), {recursive: true}); //Без рекурсиии, ошибка

console.log('START')
fs.mkdir(path.resolve(__dirname, 'dir'), (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('Directory created')
});
console.log('END')

//Удаление папки
fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
    if(err){
        throw err;
    }
})

//Записать в файл, но при этом перезатрется его содержимое
fs.writeFile(path.resolve(__dirname, 'test.txt'), '5 qwerty 7 9 4', (err) => {
    if(err){
        throw err;
    }
    console.log('File recorded')
});

//Дозаписать в файл
fs.appendFile(path.resolve(__dirname, 'test.txt'), ' add to end', (err) => {
    if(err){
        throw err;
    }
    console.log('File recorded again')
});
//Для того что бы данные точно добавились в конец, можно сделать вложеность или воспольоваться промисами
const writeFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => fs.writeFile(path, data, (err) => {
        if(err){
            return reject(err.message )
        }
        resolve()
    }))
}
const appendFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => fs.appendFile(path, data, (err) => {
        if(err){
            return reject(err.message )
        }
        resolve()
    }))
}
//Чтение файлов
const readFileAsync = async (path) => {
    return new Promise((resolve, reject) => fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
        if(err){
            return reject(err.message )
        }
        resolve(data)
    }))
}
//Удаление файлов
const removeFileAsync = async (path) => {
    return new Promise((resolve, reject) => fs.rm(path,  (err) => {
        if(err){
            return reject(err.message )
        }
        resolve()
    }))
}

removeFileAsync(path.resolve(__dirname, 'test.txt'))
    .then(() => console.log('Remove complete'))

writeFileAsync(path.resolve(__dirname, 'test1.txt'), 'start data')
    .then(() => appendFileAsync(path.resolve(__dirname, 'test1.txt'),'123'))
    .then(() => appendFileAsync(path.resolve(__dirname, 'test1.txt'),'456'))
    .then(() => appendFileAsync(path.resolve(__dirname, 'test1.txt'),'789'))
    .then(() => readFileAsync(path.resolve(__dirname, 'test1.txt')))
    .then(data => console.log(data))
    .catch(err => console.log(err))

//Через переменную окружения передать строку, записать ее в файл
//прочитать файл, посчитать количество слов в файле и записать
//их в новый файл count.txt, затем удалить первый файл

const text = process.env.TEXT || '';

writeFileAsync(path.resolve(__dirname, 'text.txt'), text)
    .then(() => readFileAsync(path.resolve(__dirname, 'text.txt')))
    .then(data => data.split(' ').length)
    .then(count => writeFileAsync(path.resolve(__dirname, 'count.txt'), `Колиство слов ${count}`))
    .then(() => removeFileAsync(path.resolve(__dirname, 'text.txt')))
    .then(() => console.log('Mission complete!'))
    .catch(err => console.log(err))


