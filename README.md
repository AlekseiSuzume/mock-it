# Mock IT
Мок-сервер с графическим интерфейсом для имитации ответов API.

### Добавление или редактирование мок-ответа

<img src= ".desc/create_mock_page_example.jpg"  alt="">

### Страница просмотра логов

<img src= ".desc/log_page_example.jpg"  alt="">


## Запуск мок-сервера
Для запуска мок-сервера необходим docker-compose.

Выполнить команду из корня проекта:
```bash
docker-compose up
```
После развёртывания контейнеров, станут доступны:
- Frontend -  http://localhost:21000
- Rest API: http://localhost:20000 
- Swagger - http://localhost:20000/docs
