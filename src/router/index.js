import Vue from 'vue';
import Router from 'vue-router';
import energyConsumption from '@/pages/energy-consumption';
import energyEconomize from '@/pages/energy-economize';
import energyArea from '@/pages/energy-area';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            meta: {
                title: '能耗数据'
            },
            component: energyConsumption
        },
        {
            path: '/economize',
            name: 'economize',
            meta: {
                title: '节能数据'
            },
            component: energyEconomize
        },
        {
            path: '/area',
            name: 'area',
            meta: {
                title: '智慧园区'
            },
            component: energyArea
        }
    ]
});
