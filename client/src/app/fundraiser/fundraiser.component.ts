/*
 * @Descripttion: Web-A3
 * @Author: Zhujiayao & Luchenchen
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';//在路由中拿参数
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrl: './fundraiser.component.css'
})
export class FundraiserComponent implements OnInit{

  fundraisers:any;
  fundraiserId: any='';
  
  // 构造函数中注入DataService
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // 从查询参数中获取筹款活动ID
    this.fundraiserId = this.route.snapshot.queryParamMap.get('id');
    // 获取筹款活动详情
    this.dataService.getFundraiser(this.fundraiserId).subscribe(
      (fundraiser) => {
        // 当数据成功返回时，将其赋值给data属性
        this.fundraisers= fundraiser;
      },
      (error) => {
        // 处理错误情况
        console.error('Error fetching data: ', error);
    });
  }
  
   // 捐赠按钮点击事件
   onDonate() {
    alert('此功能正在建设中');
  }
}

