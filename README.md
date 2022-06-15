# style-guide
Angular style guide

Здесь постараюсь вкратце поделиться наработками использования кастомных переменных при вёрстке компонентов.

#### Для инфы
>
> - https://angular.io/guide/component-styles
> - https://blog.angular-university.io/angular-host-context/

# Для чего нужны кастомные переменные?

Например у нас есть кнопка. Кнопка может использоваться во всём приложении,
быть дочерним компонентом других компонентов/страниц. Кнопка может, и должна иметь
гибкость настройки своего внешнего вида, а именно: длинна, высота, радиус скругления углов.
В одном месте приложения кнопка должна быть высотой `40px`, в другом - `56px`.

[app/components/button/button.component.scss](https://github.com/Smoke1987/style-guide/blob/856726b20426d5df16043593dd0a41706fa81feb/src/app/components/button/button.component.scss#L1-L8)
```scss
:host {
    --font-size: 14px;
    --font-color: #0c0b0b;
    --height: 52px;

    .button-wrapper {
        height: var(--height);
        ...
    }
  
    ...
}
```

При использовании псевдо-класса `:host` мы можем назначить переменные со значениями по-умолчанию для конкретного компонента.
Данные переменные, конечно же, можно назначить и глобально. 
Но тогда они будут нагружать собой DOM-дерево и его корневой узел, 
тогда как обозначив их внутри хоста, они будут существовать только в период жизни компонента.

Дальше, в любом месте, где нам нужно изменить высоту кнопки, мы можем (и **_Best Practices_**
призывает нас) не используя `::ng-deep` регулировать высоту так:

[app/components/info-chip/info-chip.component.scss](https://github.com/Smoke1987/style-guide/blob/856726b20426d5df16043593dd0a41706fa81feb/src/app/components/info-chip/info-chip.component.scss#L28-L29)

```scss
    app-button {
        --height: 48px;
        ...
    }
```

Это упрощает чтение кода, даёт "гибкость" (у разных заказчиков могут быть разные пожелания к одной и той же кнопке),
я также предотвращает от неожиданных результатов вёрстки (см. пункт ниже)

# Почему не `::ng-deep` ?

Самый большой минус (или плюс) данного псевдо-класса: он применяет стиль ко всем вложенным элементам
(в том числе и инкапсулированным вьюшкам, а также компонентам с DOM-shadow).

[app/pages/home.page.scss](https://github.com/Smoke1987/style-guide/blob/856726b20426d5df16043593dd0a41706fa81feb/src/app/pages/home.page.scss#L29-L36)

```scss
// Данный селектор окрасит все иконки (.icon) внутри всех элементов внутри app-info-chip в красный цвет (что неочевидно)
// тогда как .button-wrapper в button.component.scss говорит, что цвет всей кнопки (для текста и для иконки) var(--color)
::ng-deep app-info-chip .icon {
  color: red;
  width: 30px;
  height: 30px;
  font-size: 30px;
}
```

Разработчик, видя такой код, сможет подумать (и вряд-ли с ходу определит),
что он красит иконку внутри чипа в красный...
(посмотреть результат можно запустив приложение и закомментировав строку с цветом)

# Зачем `:host`, `:host(<selector>)`, `:host-context(<selector>)` ?

`:host` - инкапсуляция вёрстки. Видны все переменные из всех родителей DOM-дерева.
Родителям и другим потомкам родиетелей не видны переменные, опреджелённые внутри хоста.
Здесь можно описывать все параметры для гибкости

`:host(<selector>)` - применяется к текущемму компоненту с конкретным селектором.

[app/components/info-chip/info-chip.component.html](https://github.com/Smoke1987/style-guide/blob/856726b20426d5df16043593dd0a41706fa81feb/src/app/components/info-chip/info-chip.component.html#L4)
```angular2html
<app-button class="button" [ngClass]="{'small': index === 3}"></app-button>
```

[app/components/button/button.component.scss](https://github.com/Smoke1987/style-guide/blob/856726b20426d5df16043593dd0a41706fa81feb/src/app/components/button/button.component.scss#L36-L40)
```scss
:host(.small) {
    --icon-size: 16px;
    --button-padding: 5px;
    --height: 34px;
}
```
Для кнопки `<app-button class="small">` будут применены определённые параметры.

`:host-context(<selector>)` - применяется к текущему компоненту в том случае,
если компонент имеет родителя с выбранным селектором (хост внутри контекста <selector>)

[app/components/info-chip/info-chip.component.scss](https://github.com/Smoke1987/style-guide/blob/856726b20426d5df16043593dd0a41706fa81feb/src/app/components/info-chip/info-chip.component.scss#L47-L51)
```scss
// Компонент, который будет находиться внутри контекста .some-another-context (или ещё глубже по DOM-дереву)
// будет с таким бордером
:host-context(.some-another-context) {
    border: 2px solid red;
}
```

Проект можно скачать, запустить, и поиграться с кодом для понимания, что происходит на практике.
