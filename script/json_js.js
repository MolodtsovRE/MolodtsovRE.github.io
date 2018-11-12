//tag -  тэг элемента.
//cls - классы, присвоенные элементу.
//attr - атрибуты элемента.
//content - Дочерние элементы (Могут быть как другие элементы, так и текст или число).


var data = {
    tag: 'div',
    cls: ['row', 'seating-row', 'text-center'],
    attr: {
        name: 'test',
        num_str: '12'
    },
    content: [{
            tag: 'div',
            cls: ['col-xs-1', 'row-number'],
            content: {
                tag: 'h2',
                content: 'Заголовок_h2'
            }
        },
        {
            tag: 'div',
            cls: 'col-xs-5',
            attr: {
                id: 'div_1'
            },
            content: [{
                tag: 'h3',
                content: 'Заголовок_h3'
            }, {
                tag: 'span',
                content: 'Тут может быть ваш текст'
            }]
        },
        {
            tag: 'div',
            cls: 'col-xs-5',
            content: [{
                tag: 'h3',
                content: 'Заголовок_h3'
            }, {
                tag: 'span',
                content: 'Тут может быть ваш текст'
            }]
        }
    ]
};
//console.log(JSON.stringify(data));
// разобрать и перевести данные в объекты, которые может использовать js
var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
}
request.open('GET', 'json/data.json');
request.onreadystatechange = function() {
    if ((request.readyState===4) && (request.status===200)){
        var items = JSON.parse(request.responseText);
        console.log(items);
    }
}
request.send();
/*
Для инициации Cross-origin запроса браузер клиента добавляет в HTTP запрос Origin 
(домен сайта, с которого происходит запрос). 
В случае локальной ФС - это null. Доступ с такого адреса запрещен политикой.

Если короче, то подгрузка скриптов с файловой системы блокируется в целях безопасности.
*/
