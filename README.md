[animate.css](https://animate.style)

## Пользователь

- Просматривать свои заказы
- Получить информацию о состоянии заказа

## Администратор

- Получить информацию по любому заказу
- Создать новый заказ

## Исполнитель

- Получить список заказов в пункте
- Отметить принятие заказа к перевозке на участке
- Отметить завершение заказа к перевозке на участке

```mermaid
sequenceDiagram;
participant user
participant server
participant db
user->>+server: getInvoiceList
server->>db: sqlRequest
db-->>server: Invoice list
server->>user: invoice list
```

### User get invoice info

```mermaid
sequenceDiagram;
participant user
participant server
participant db
user->>+server: getInvoiceInfo :id
server->>db: sql invoice info
db-->>server: Invoice list
server-->>user: invoice list
server->>db: sql waypoints info
db-->>server: waypoints info
server-->user: waypoints info
```

### Admin invoice info

```mermaid
sequenceDiagram;
participant admin
participant server
participant db
admin->>server: invoice id:
server->>db: sql get invoice info
db-->>server: invoice info
server->>db: sql get waypoints info
db-->>server: waypoints info
server->>db: sql get executors info
db-->>server: executors info
server-->>admin: complex info
```