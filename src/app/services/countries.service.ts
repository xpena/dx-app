import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  // posibles campos que van en la salida de la petición
  public fields: string;

  constructor(private http: HttpClient) {
    this.fields = 'flag;name;capital;currencies;languages;alpha3Code;region;';
  }

  // httpget generico
  genericQuery(service: string, fields: string = '') {
    const url = `https://restcountries.eu/rest/v2/${ service }?fields=${ fields === '' ? this.fields : fields }/`;
    return this.http.get(url);
  }

  // obtener todos los paises
  getCountries() {
    return this.genericQuery('all');
  }

  // obtener pais por nombre
  getCountriesByName(name: string) {
    return this.genericQuery(`name/${ name }`);
  }

  // obtener pais por codigo
  getCountry(country: string) {
    return this.genericQuery(`alpha/${ country }`,
    'nativeName;topLevelDomain;alpha3Code;name;region;subregion;population;borders;flag;languages;latlng;');
  }

  // metodo que permite obtener paises por cualquier filtro
  getFilter(type: string, text: string) {
    return this.genericQuery(`${ type }/${ text }`);
  }

}
