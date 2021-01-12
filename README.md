[competent-turing-b92515.netlify.app](https://competent-turing-b92515.netlify.app)

### Запуск
```
npm i && npm run webpack
```

### Почему используется Webpack
Вынужден использовать сборщик, так как компилятор ts не умеет менять расширения в импортах.
[Ссылка на проблему на гитхабе.](https://github.com/microsoft/TypeScript/issues/16577)

То есть вместо
```
import {Pathname} from './pathname'
```
Нужно делать
```
import {Pathname} from './pathname.js'
```
Это пустая трата времени, тем более учитывая, что в будущем будет сборщик.

Сборщик используется только для добавления расширений и импорта стилей.

Стили разбиты на компоненты, но могут быть добавлены не через сборщик, а через `@import`
в `app.sass`.

### Шаблонизатор
Конструкции с while и другое мне не нравится, попробую поправить в будущем.

Ссылка на элементы с динамическими атрибутами добавляется в `store` компонента, 
чтобы при их изменении была возможность обновить их в дереве.  

### Куки
Чтобы работало, необходимо использовать `Chrome`.
