import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Chart from 'chart.js';
import { DashboardService } from './dashboard.service';
import { HttpResponse } from '@angular/common/http';

import {
  chartOptions,
  parseOptions,
  constChartHomicidios,
  constChartHomicidiosArmaFogo
} from "./dashboard.charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  homicidioChart;
  homicidioArmaFogoChart;

  form: FormGroup;
  municipios = [];
  message = '';
  homicidiosArray = [];
  homicidiosArmaFogoArray = [];

  constructor(private dashboardService: DashboardService) {
    this.form = new FormGroup({
      municipioSelected: new FormControl(['Manaus'])
    });

    this.loadDataByMunicipio();
  }

  ngOnInit() {
    this.municipios = this.getMunicipios();

    var homicidioChartElement = document.getElementById('chart-homicidios');
    var homicidioArmaFogoChartElement = document.getElementById('chart-homicidios-arma-fogo');

    parseOptions(Chart, chartOptions());

    this.homicidioChart = new Chart(homicidioChartElement, {
			type: 'line',
			options: constChartHomicidios.options,
			data: constChartHomicidios.data
		});

    this.homicidioArmaFogoChart = new Chart(homicidioArmaFogoChartElement, {
			type: 'line',
			options: constChartHomicidiosArmaFogo.options,
			data: constChartHomicidiosArmaFogo.data
		});
  }

  loadDataByMunicipio() {
    var municipio = this.form.get('municipioSelected').value;

    this.dashboardService.loadDataByMunicipio(municipio).subscribe(
      (event: any): void => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
          this.configurarGraficos(event.body);
        }
      },
      (err: any) => {
        console.log(err);

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Não foi possível realizar o carregamento dos dados!';
        }
      });
  }

  configurarGraficos(dadosArray) {
    this.configurarGraficoHomicidio(dadosArray);

    this.configurarGraficoHomicidioArmaFogo(dadosArray);
  }

  private configurarGraficoHomicidio(dadosArray) {
    this.homicidiosArray = dadosArray.filter((dado) => {
      return dado.serie.codigo === 17;
    })


    var dataHomicidio =  this.homicidiosArray.map(item => {
      return item.valor;
    });

    this.homicidioChart.data.datasets[0].data = dataHomicidio;
    this.homicidioChart.update();
  }

  private configurarGraficoHomicidioArmaFogo(dadosArray) {
    this.homicidiosArmaFogoArray = dadosArray.filter((dado) => {
      return dado.serie.codigo === 24;
    })


    var dataHomicidio =  this.homicidiosArmaFogoArray.map(item => {
      return item.valor;
    });

    this.homicidioArmaFogoChart.data.datasets[0].data = dataHomicidio;
    this.homicidioArmaFogoChart.update();
  }

  getMunicipios() {
    return [
      {id: '1', name: 'Manaus'},
      {id: '2', name: 'Rio de Janeiro'},
      {id: '3', name: 'São Paulo'}
    ];
  }

}
