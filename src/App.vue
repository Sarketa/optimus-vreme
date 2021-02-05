<template>
  <div
    id="app"
    :class="
      typeof weather.main != 'undefined' && weather.main.temp > 20
        ? 'toplo'
        : ''
    "
  >
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search..."
          v-model="query"
          @keypress="fetchWeather"
        />
      </div>
      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="lokacioni-box">
          <div class="lokacija">
            {{ weather.name }} - {{ weather.sys.country }}
          </div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>
        <div class="weather-box">
          <div class="temperatura">
            {{ Math.round(weather.main.temp) }}&#176;c
          </div>
          <div class="vreme">
            {{ weather.weather[0].main }}
          </div>
          <div class="opis_vremena">
            {{ weather.weather[0].description }}
          </div>
          <img
            class="ikonica"
            :src="
              'http://openweathermap.org/img/wn/' +
                weather.weather[0].icon +
                '.png'
            "
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      api_key: "266df4da89aea14f8ba1b8df800d3a36",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`
        )
          .then((res) => {
            return res.json();
          })
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
    },
    dateBuilder() {
      let d = new Date();
      let meseci = [
        "Januar",
        "Februar",
        "Mart",
        "April",
        "Maj",
        "Jun",
        "Jul",
        "Avgust",
        "Septembar",
        "Oktobar",
        "Novembar",
        "Decembar",
      ];
      let dani = [
        "Ponedeljak",
        "Utorak",
        "Sreda",
        "Četvrtak",
        "Petak",
        "Subota",
        "Nedelja",
      ];
      let dan = dani[d.getDay()];
      let date = [d.getDate()];
      let mesec = meseci[d.getMonth()];
      let godina = d.getFullYear();

      return `${dan} ${date} ${mesec} ${godina}`;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "montserrat", sans-serif;
}
#app {
  background-image: url("./assets/hladno.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.4s;
}

#app.toplo {
  background-image: url("./assets/toplo.jpg");
}

main {
  min-height: 100vh;
  padding: 25px;

  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.7)
  );
}

.search-box {
  width: 40%;
  margin-bottom: 50px;
  margin-left: 50%;
  margin-right: 50%;
  transform: translate(-50%);
}
.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.55);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.lokacioni-box .lokacija {
  color: rgb(255, 255, 255);
  font-size: 2em;
  font-weight: 600;
  text-align: center;
  text-shadow: 0.2px 2px rgba(0, 0, 0, 0.25);
}

.lokacioni-box .date {
  color: rgb(255, 255, 255);
  font-size: 1.3rem;
  font-weight: 300;
  text-align: center;
  font-style: italic;
  text-shadow: 0.2px 2px rgba(0, 0, 0, 0.25);
}

.weather-wrap {
  text-align: center;
}
.weather-wrap .temperatura {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 8em;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 7px 5px rgba(0, 0, 0, 0.25);
}
.weather-wrap .vreme {
  color: #fff;
  font-size: 6em;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 5px rgba(0, 0, 0, 0.25);
}
.weather-wrap .opis_vremena {
  color: white;
  font-size: 1.2em;
  font-weight: 500;
  font-style: bold;
  text-transform: uppercase;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
</style>
