import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';

import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';


export const appRoutes: Route[] = [

  { path: '', pathMatch: 'full', redirectTo: 'visita' },

  // Rotas para usuário não autenticados
  {
    path: '',
    // canMatch: [NoAuthGuard],
    children: [
      
      { path: 'visita', loadChildren: () => import('app/modules/sala-de-visita/sala-de-visita.module').then(m => m.SalaDeVisitaModule) },
      
      // { path: 'logout', loadChildren: () => import('app/core/pages/logout/logout.module').then(m => m.LogoutModule) },
      // { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/core/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
    ]
  },
  { path: 'callback', loadChildren: () => import('app/core/pages/callback/callback.module').then(m => m.CallbackModule) },
  { path: 'logout', loadChildren: () => import('app/core/pages/logout/logout.module').then(m => m.LogoutModule) },
  { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/core/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
  { path: 'signin', loadChildren: () => import('app/core/pages/signin/signin.module').then(m => m.SigninModule) },
  // Rotas para usuários autenticados
  {
    path: '',
    canMatch: [AuthGuard],
    component: SideNavComponent,
    children: [
      { path: 'cartaoConsumo', loadChildren: () => import('./modules/cartao-consumo/cartao-consumo.module').then(m => m.CartaoConsumoModule) },
      { path: 'cliente', loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule) },
      { path: 'cadastroCliente', loadChildren: () => import('./modules/cadastro-cliente/cadastro-cliente.module').then(m => m.CadastroClienteModule) },
      { path: 'cartaoCliente', loadChildren: () => import('./modules/cartao-cliente/cartao-cliente.module').then(m => m.CartaoClienteModule) },
      { path: 'categoria', loadChildren: () => import('./modules/categoria/categoria.module').then(m => m.CategoriaModule) },
      { path: 'cozinha', loadChildren: () => import('./modules/cozinha/cozinha.module').then(m => m.CozinhaModule) },
      { path: 'endereco', loadChildren: () => import('./modules/endereco/endereco.module').then(m => m.EnderecoModule) },
      { path: 'garcon', loadChildren: () => import('./modules/garcon/garcon.module').then(m => m.GarconModule) },
      { path: 'itemPedido', loadChildren: () => import('./modules/item-pedido/item-pedido.module').then(m => m.ItemPedidoModule) },
      { path: 'menu', loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule) },
      { path: 'opcional', loadChildren: () => import('./modules/opcional/opcional.module').then(m => m.OpcionalModule) },
      { path: 'pagamento', loadChildren: () => import('./modules/pagamento/pagamento.module').then(m => m.PagamentoModule) },
      { path: 'pedido', loadChildren: () => import('./modules/pedido/pedido.module').then(m => m.PedidoModule) },
      { path: 'produto', loadChildren: () => import('./modules/produto/produto.module').then(m => m.ProdutoModule) },
      { path: 'tipoPagamento', loadChildren: () => import('./modules/tipo-pagamento/tipo-pagamento.module').then(m => m.TipoPagamentoModule) },
      // Pages
      {
        path: 'pages', children: [
          // Coming Soon
          // { path: 'coming-soon', loadChildren: () => import('app/modules/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule) },
          // Error
          {
            path: 'error', children: [
              { path: '404', loadChildren: () => import('app/core/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
              { path: '500', loadChildren: () => import('app/core/pages/error/error-500/error-500.module').then(m => m.Error500Module) }
            ]
          },

          // Maintenance
          { path: 'maintenance', loadChildren: () => import('app/core/pages/maintenance/maintenance.module').then(m => m.MaintenanceModule) },
        ]
      },

      // 404 & Catch all
      
      { path: '**', redirectTo: '/404-not-found' }
    ]
  },

];
