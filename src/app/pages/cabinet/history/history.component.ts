import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  public userOrders = [
    {
      'id': 1,
      'data': '09.11.2023 13:45:49',
      'address': 'самовивіз',
      'products': [
        {
          'id': '10',
          'name': 'Запечений сирний з креветкою',
          'count': 1
        },
        {
          'id': '20',
          'name': 'Каліфорнія з крабом',
          'count': 1
        }
      ],
      'sum': '960',
      'status': 'виконано'
    },
    {
      'id': 2,
      'data': '09.11.2023 13:45:49',
      'address': 'Львів, вул. Зелена 204б',
      'products': [
        {
          'id': '10',
          'name': 'Запечений сирний з креветкою',
          'count': 1
        }
      ],
      'sum': '510',
      'status': 'виконано'
    }
  ]

  
}
