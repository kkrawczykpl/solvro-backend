# Solvro Backend

Jest to projekt tworzony w ramach rekrutacji do Koła Naukowego Politechniki Wrocławskiej **Solvro**

[ Więcej informacji: https://github.com/Solvro/rekrutacja ](https://github.com/Solvro/rekrutacja)

## Opis Projektu

> Wyobraź sobie, że piszesz backend do **aplikacji imitującej JakDojade**!
> 
> W [pliku](https://github.com/Solvro/rekrutacja/blob/master/backend/solvro_city.json) JSON dostaniesz zapisaną mapę przystanków w Solvro City. Napisz część serwisu odpowiadającą za rejestrację i logowanie się użytkownika oraz za podawanie informacji o przystankach i najkrótszej trasy pomiędzy dwoma z nich. O sposobie podawania tych informacji powie Ci [specyfikacja](https://github.com/Solvro/rekrutacja/blob/master/backend/stops_api.yaml) (część z wyznaczaniem trasy wykonaj bez używania zewnętrznych bibliotek)
> 
> Do Twojej dyspozycji dajemy [skrypt](https://github.com/Solvro/rekrutacja/blob/master/backend/city_generator.py), który generuje mapę miasta i zapisuję ją do pliku. Możesz go użyć do testowania swojego API dla różnych map.
> 
> Na koniec zadbaj o **przejrzyste readme**.
> 
> Nice to have:
>  - łatwość odpalania Twojego kodu niezależnie od środowiska (serdecznie polecamy Dockera)
>  - swagger wygenerowany z kodu na wybranym porcie :-)
> 
> Oceniana będzie jakość kodu, jego dokumentacja, rozwiązanie postawionego problemu, użycie odpowiednich technologii, odporność na podstawowe ataki oraz błędne dane (które nie są zawarte w specyfikacji) i praca z systemem kontroli wersji.  
**Czas na wykonanie tego zadania to 2 tygodnie.**
>
[ via: @Solvro/rekrutacja ](https://github.com/Solvro/rekrutacja)

**Live**

https://solvrobackend.herokuapp.com/

Swagger:
https://solvrobackend.herokuapp.com/swagger/

**Instalacja**

```
git clone https://github.com/kkrawczykpl/solvro-backend.git
cd solvro-backend
npm install
```

**Konfiguracja**
* Zrób kopię .env.example i zmień nazwę na .env, podmień dane na twoje.

**Użytkowanie**

* `npm run prebuild` Usuwa wszystko z ./dist/*, wczytuje _config_ i _project_ tslint
* `npm run build` Uruchamia kompiler TS i tworzy kopie package.json
* `npm run prestart` Uruchamia `npm run build`
* `npm start` Uruchamia ts-node .

**Uruchamianie projektu**
* Zainstaluj projekt wedle opisu instalacji w README
* Wypełnij dane w pliku *.env
* Wygeneruj mapę miasta używając [skryptu](https://github.com/Solvro/rekrutacja/blob/master/backend/city_generator.py) w ./src/utils
* Uruchom `npm start`

**Endpointy**

* GET /
* GET /ping
* GET /stops
* GET /path/{source}/{target}
* GET /secured
* POST /auth/login
* POST /auth/register
* POST /auth/logout

**Informacje**

~~Nie trzymałem się sztywno ustalonej specyfikacji intencjonalnie. Ponieważ kilka przystanków może mieć taką samą nazwę uważam, że powinna być zwracana taka informacja jak np. ID przystanku od którego/do którego zmierza użytkownik.~~ W pierwotnej wersji źle zinterpretowałem zadanie. W specyfikacji podany typ parametrów source/target był to string, więc stwierdziłem, że trasa powinna być szukana w oparciu o nazwę przystanków. Po konsultacji jednak okazało się, ze jest to błąd i trasa powinna być szukana wg. ID przystanków. Nie było słowa skąd mają pochodzić dane które mają być wczytywane jako mapa miasta, dlatego stwierdziłem że rozsądnym będzie zostawienie jej w pliku *.json, co ułatwiało też proces testowania.


**Technologies**

* [TypeScript](https://github.com/microsoft/TypeScript)
* [Express](https://github.com/expressjs/express)
* [Swagger](https://github.com/swagger-api/swagger-ui)
* [Mongoose](https://github.com/Automattic/mongoose)

**Pakiety**

* [envalid](https://github.com/af/envalid)
* [body-parser](https://github.com/expressjs/body-parser)
* [class-validator](https://github.com/typestack/class-validator)
* [class-transformer](https://github.com/typestack/class-transformer)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)



