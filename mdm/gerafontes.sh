#!/bin/bash
cd ..
git clone https://github.com/JoaoVictorNobuntu/frontend
cd frontend
ng add @angular/material
npm install bootstrap@4.1.3 jquery@3.3.1 popper.js@1.14.3 --save 
cd src/app
ng g m core
cd core
mkdir components
cd ..
ng g m shared
cd shared
mkdir components 
mkdir model
mkdir services
cd ..
mkdir modules
cd ../../..
mkdir backend
mkdir backend/routes
mkdir backend/models
mkdir backend/app
mkdir backend/app/controllers
mkdir backend/app/middleware
mkdir frontend/src/enviroment
mkdir frontend/src/assets/dicionario
cd frontend
npm install
cd ..
cd frontend/src/app/modules/
ng g m cartaoConsumo --routing
cd cartao-consumo
ng g c CartaoConsumoForm
ng g c ListCartaoConsumo
mkdir shared
cd ..
ng g m cliente --routing
cd cliente
ng g c ClienteForm
ng g c ListCliente
mkdir shared
cd ..
ng g m cadastroCliente --routing
cd cadastro-cliente
ng g c CadastroClienteForm
ng g c ListCadastroCliente
mkdir shared
cd ..
ng g m cartaoCliente --routing
cd cartao-cliente
ng g c CartaoClienteForm
ng g c ListCartaoCliente
mkdir shared
cd ..
ng g m categoria --routing
cd categoria
ng g c CategoriaForm
ng g c ListCategoria
mkdir shared
cd ..
ng g m cozinha --routing
cd cozinha
ng g c CozinhaForm
ng g c ListCozinha
mkdir shared
cd ..
ng g m endereco --routing
cd endereco
ng g c EnderecoForm
ng g c ListEndereco
mkdir shared
cd ..
ng g m garcon --routing
cd garcon
ng g c GarconForm
ng g c ListGarcon
mkdir shared
cd ..
ng g m itemPedido --routing
cd item-pedido
ng g c ItemPedidoForm
ng g c ListItemPedido
mkdir shared
cd ..
ng g m menu --routing
cd menu
ng g c MenuForm
ng g c ListMenu
mkdir shared
cd ..
ng g m opcional --routing
cd opcional
ng g c OpcionalForm
ng g c ListOpcional
mkdir shared
cd ..
ng g m pagamento --routing
cd pagamento
ng g c PagamentoForm
ng g c ListPagamento
mkdir shared
cd ..
ng g m pedido --routing
cd pedido
ng g c PedidoForm
ng g c ListPedido
mkdir shared
cd ..
ng g m produto --routing
cd produto
ng g c ProdutoForm
ng g c ListProduto
mkdir shared
cd ..
ng g m tipoPagamento --routing
cd tipo-pagamento
ng g c TipoPagamentoForm
ng g c ListTipoPagamento
mkdir shared
cd ..
cd ../../../..
cd backend/models
mi g app mean index > index.js
cd ..
mi g app mean server > server.js
npm init -y
npm install express mongoose cors --save
cd ..
mi g app angular appModule > frontend/src/app/app.module.ts
mi g app angular appRouting > frontend/src/app/app-routing.module.ts
mi g app angular appComponentHTML > frontend/src/app/app.component.html
mi g app angular appComponentTS > frontend/src/app/app.component.ts
mi g app angular indexHTML > frontend/src/index.html
mapperidea generate app mean mongoModel entityName=CartaoConsumo > backend/models/cartaoConsumo.model.js
mapperidea generate app mean mongoModel entityName=Cliente > backend/models/cliente.model.js
mapperidea generate app mean mongoModel entityName=CadastroCliente > backend/models/cadastroCliente.model.js
mapperidea generate app mean mongoModel entityName=CartaoCliente > backend/models/cartaoCliente.model.js
mapperidea generate app mean mongoModel entityName=Categoria > backend/models/categoria.model.js
mapperidea generate app mean mongoModel entityName=Cozinha > backend/models/cozinha.model.js
mapperidea generate app mean mongoModel entityName=Endereco > backend/models/endereco.model.js
mapperidea generate app mean mongoModel entityName=Garcon > backend/models/garcon.model.js
mapperidea generate app mean mongoModel entityName=ItemPedido > backend/models/itemPedido.model.js
mapperidea generate app mean mongoModel entityName=Menu > backend/models/menu.model.js
mapperidea generate app mean mongoModel entityName=Opcional > backend/models/opcional.model.js
mapperidea generate app mean mongoModel entityName=Pagamento > backend/models/pagamento.model.js
mapperidea generate app mean mongoModel entityName=Pedido > backend/models/pedido.model.js
mapperidea generate app mean mongoModel entityName=Produto > backend/models/produto.model.js
mapperidea generate app mean mongoModel entityName=TipoPagamento > backend/models/tipoPagamento.model.js
mapperidea generate app mean apiController entityName=CartaoConsumo > backend/app/controllers/cartaoConsumo.controller.js
mapperidea generate app mean apiController entityName=Cliente > backend/app/controllers/cliente.controller.js
mapperidea generate app mean apiController entityName=CadastroCliente > backend/app/controllers/cadastroCliente.controller.js
mapperidea generate app mean apiController entityName=CartaoCliente > backend/app/controllers/cartaoCliente.controller.js
mapperidea generate app mean apiController entityName=Categoria > backend/app/controllers/categoria.controller.js
mapperidea generate app mean apiController entityName=Cozinha > backend/app/controllers/cozinha.controller.js
mapperidea generate app mean apiController entityName=Endereco > backend/app/controllers/endereco.controller.js
mapperidea generate app mean apiController entityName=Garcon > backend/app/controllers/garcon.controller.js
mapperidea generate app mean apiController entityName=ItemPedido > backend/app/controllers/itemPedido.controller.js
mapperidea generate app mean apiController entityName=Menu > backend/app/controllers/menu.controller.js
mapperidea generate app mean apiController entityName=Opcional > backend/app/controllers/opcional.controller.js
mapperidea generate app mean apiController entityName=Pagamento > backend/app/controllers/pagamento.controller.js
mapperidea generate app mean apiController entityName=Pedido > backend/app/controllers/pedido.controller.js
mapperidea generate app mean apiController entityName=Produto > backend/app/controllers/produto.controller.js
mapperidea generate app mean apiController entityName=TipoPagamento > backend/app/controllers/tipoPagamento.controller.js
mapperidea generate app angular model entityName=CartaoConsumo > frontend/src/app/modules/cartao-consumo/shared/cartao-consumo.model.ts
mapperidea generate app angular model entityName=Cliente > frontend/src/app/modules/cliente/shared/cliente.model.ts
mapperidea generate app angular model entityName=CadastroCliente > frontend/src/app/modules/cadastro-cliente/shared/cadastro-cliente.model.ts
mapperidea generate app angular model entityName=CartaoCliente > frontend/src/app/modules/cartao-cliente/shared/cartao-cliente.model.ts
mapperidea generate app angular model entityName=Categoria > frontend/src/app/modules/categoria/shared/categoria.model.ts
mapperidea generate app angular model entityName=Cozinha > frontend/src/app/modules/cozinha/shared/cozinha.model.ts
mapperidea generate app angular model entityName=Endereco > frontend/src/app/modules/endereco/shared/endereco.model.ts
mapperidea generate app angular model entityName=Garcon > frontend/src/app/modules/garcon/shared/garcon.model.ts
mapperidea generate app angular model entityName=ItemPedido > frontend/src/app/modules/item-pedido/shared/item-pedido.model.ts
mapperidea generate app angular model entityName=Menu > frontend/src/app/modules/menu/shared/menu.model.ts
mapperidea generate app angular model entityName=Opcional > frontend/src/app/modules/opcional/shared/opcional.model.ts
mapperidea generate app angular model entityName=Pagamento > frontend/src/app/modules/pagamento/shared/pagamento.model.ts
mapperidea generate app angular model entityName=Pedido > frontend/src/app/modules/pedido/shared/pedido.model.ts
mapperidea generate app angular model entityName=Produto > frontend/src/app/modules/produto/shared/produto.model.ts
mapperidea generate app angular model entityName=TipoPagamento > frontend/src/app/modules/tipo-pagamento/shared/tipo-pagamento.model.ts
mi g app angular dataService entityName=CartaoConsumo > frontend/src/app/modules/cartao-consumo/shared/cartao-consumo.service.ts
mi g app angular dataService entityName=Cliente > frontend/src/app/modules/cliente/shared/cliente.service.ts
mi g app angular dataService entityName=CadastroCliente > frontend/src/app/modules/cadastro-cliente/shared/cadastro-cliente.service.ts
mi g app angular dataService entityName=CartaoCliente > frontend/src/app/modules/cartao-cliente/shared/cartao-cliente.service.ts
mi g app angular dataService entityName=Categoria > frontend/src/app/modules/categoria/shared/categoria.service.ts
mi g app angular dataService entityName=Cozinha > frontend/src/app/modules/cozinha/shared/cozinha.service.ts
mi g app angular dataService entityName=Endereco > frontend/src/app/modules/endereco/shared/endereco.service.ts
mi g app angular dataService entityName=Garcon > frontend/src/app/modules/garcon/shared/garcon.service.ts
mi g app angular dataService entityName=ItemPedido > frontend/src/app/modules/item-pedido/shared/item-pedido.service.ts
mi g app angular dataService entityName=Menu > frontend/src/app/modules/menu/shared/menu.service.ts
mi g app angular dataService entityName=Opcional > frontend/src/app/modules/opcional/shared/opcional.service.ts
mi g app angular dataService entityName=Pagamento > frontend/src/app/modules/pagamento/shared/pagamento.service.ts
mi g app angular dataService entityName=Pedido > frontend/src/app/modules/pedido/shared/pedido.service.ts
mi g app angular dataService entityName=Produto > frontend/src/app/modules/produto/shared/produto.service.ts
mi g app angular dataService entityName=TipoPagamento > frontend/src/app/modules/tipo-pagamento/shared/tipo-pagamento.service.ts
mi g app angular appRoutingChild entityName=CartaoConsumo > frontend/src/app/modules/cartao-consumo/cartao-consumo-routing.module.ts
mi g app angular appRoutingChild entityName=Cliente > frontend/src/app/modules/cliente/cliente-routing.module.ts
mi g app angular appRoutingChild entityName=CadastroCliente > frontend/src/app/modules/cadastro-cliente/cadastro-cliente-routing.module.ts
mi g app angular appRoutingChild entityName=CartaoCliente > frontend/src/app/modules/cartao-cliente/cartao-cliente-routing.module.ts
mi g app angular appRoutingChild entityName=Categoria > frontend/src/app/modules/categoria/categoria-routing.module.ts
mi g app angular appRoutingChild entityName=Cozinha > frontend/src/app/modules/cozinha/cozinha-routing.module.ts
mi g app angular appRoutingChild entityName=Endereco > frontend/src/app/modules/endereco/endereco-routing.module.ts
mi g app angular appRoutingChild entityName=Garcon > frontend/src/app/modules/garcon/garcon-routing.module.ts
mi g app angular appRoutingChild entityName=ItemPedido > frontend/src/app/modules/item-pedido/item-pedido-routing.module.ts
mi g app angular appRoutingChild entityName=Menu > frontend/src/app/modules/menu/menu-routing.module.ts
mi g app angular appRoutingChild entityName=Opcional > frontend/src/app/modules/opcional/opcional-routing.module.ts
mi g app angular appRoutingChild entityName=Pagamento > frontend/src/app/modules/pagamento/pagamento-routing.module.ts
mi g app angular appRoutingChild entityName=Pedido > frontend/src/app/modules/pedido/pedido-routing.module.ts
mi g app angular appRoutingChild entityName=Produto > frontend/src/app/modules/produto/produto-routing.module.ts
mi g app angular appRoutingChild entityName=TipoPagamento > frontend/src/app/modules/tipo-pagamento/tipo-pagamento-routing.module.ts
mi g app mean routes entityName=CartaoConsumo > backend/routes/cartaoConsumo.routes.js
mi g app mean routes entityName=Cliente > backend/routes/cliente.routes.js
mi g app mean routes entityName=CadastroCliente > backend/routes/cadastroCliente.routes.js
mi g app mean routes entityName=CartaoCliente > backend/routes/cartaoCliente.routes.js
mi g app mean routes entityName=Categoria > backend/routes/categoria.routes.js
mi g app mean routes entityName=Cozinha > backend/routes/cozinha.routes.js
mi g app mean routes entityName=Endereco > backend/routes/endereco.routes.js
mi g app mean routes entityName=Garcon > backend/routes/garcon.routes.js
mi g app mean routes entityName=ItemPedido > backend/routes/itemPedido.routes.js
mi g app mean routes entityName=Menu > backend/routes/menu.routes.js
mi g app mean routes entityName=Opcional > backend/routes/opcional.routes.js
mi g app mean routes entityName=Pagamento > backend/routes/pagamento.routes.js
mi g app mean routes entityName=Pedido > backend/routes/pedido.routes.js
mi g app mean routes entityName=Produto > backend/routes/produto.routes.js
mi g app mean routes entityName=TipoPagamento > backend/routes/tipoPagamento.routes.js
mi g app angular listComponentHTML listName=CartaoConsumo >  frontend/src/app/modules/cartao-consumo/list-cartao-consumo/list-cartao-consumo.component.html
mi g app angular listComponentTS listName=CartaoConsumo >  frontend/src/app/modules/cartao-consumo/list-cartao-consumo/list-cartao-consumo.component.ts
mi g app angular detailsComponentHTML editorName=CartaoConsumo >  frontend/src/app/modules/cartao-consumo/cartao-consumo-form/cartao-consumo-form.component.html
mi g app angular detailsComponentTS editorName=CartaoConsumo >  frontend/src/app/modules/cartao-consumo/cartao-consumo-form/cartao-consumo-form.component.ts
mi g app angular listComponentHTML listName=Cliente >  frontend/src/app/modules/cliente/list-cliente/list-cliente.component.html
mi g app angular listComponentTS listName=Cliente >  frontend/src/app/modules/cliente/list-cliente/list-cliente.component.ts
mi g app angular detailsComponentHTML editorName=Cliente >  frontend/src/app/modules/cliente/cliente-form/cliente-form.component.html
mi g app angular detailsComponentTS editorName=Cliente >  frontend/src/app/modules/cliente/cliente-form/cliente-form.component.ts
mi g app angular listComponentHTML listName=CadastroCliente >  frontend/src/app/modules/cadastro-cliente/list-cadastro-cliente/list-cadastro-cliente.component.html
mi g app angular listComponentTS listName=CadastroCliente >  frontend/src/app/modules/cadastro-cliente/list-cadastro-cliente/list-cadastro-cliente.component.ts
mi g app angular detailsComponentHTML editorName=CadastroCliente >  frontend/src/app/modules/cadastro-cliente/cadastro-cliente-form/cadastro-cliente-form.component.html
mi g app angular detailsComponentTS editorName=CadastroCliente >  frontend/src/app/modules/cadastro-cliente/cadastro-cliente-form/cadastro-cliente-form.component.ts
mi g app angular listComponentHTML listName=CartaoCliente >  frontend/src/app/modules/cartao-cliente/list-cartao-cliente/list-cartao-cliente.component.html
mi g app angular listComponentTS listName=CartaoCliente >  frontend/src/app/modules/cartao-cliente/list-cartao-cliente/list-cartao-cliente.component.ts
mi g app angular detailsComponentHTML editorName=CartaoCliente >  frontend/src/app/modules/cartao-cliente/cartao-cliente-form/cartao-cliente-form.component.html
mi g app angular detailsComponentTS editorName=CartaoCliente >  frontend/src/app/modules/cartao-cliente/cartao-cliente-form/cartao-cliente-form.component.ts
mi g app angular listComponentHTML listName=Categoria >  frontend/src/app/modules/categoria/list-categoria/list-categoria.component.html
mi g app angular listComponentTS listName=Categoria >  frontend/src/app/modules/categoria/list-categoria/list-categoria.component.ts
mi g app angular detailsComponentHTML editorName=Categoria >  frontend/src/app/modules/categoria/categoria-form/categoria-form.component.html
mi g app angular detailsComponentTS editorName=Categoria >  frontend/src/app/modules/categoria/categoria-form/categoria-form.component.ts
mi g app angular listComponentHTML listName=Cozinha >  frontend/src/app/modules/cozinha/list-cozinha/list-cozinha.component.html
mi g app angular listComponentTS listName=Cozinha >  frontend/src/app/modules/cozinha/list-cozinha/list-cozinha.component.ts
mi g app angular detailsComponentHTML editorName=Cozinha >  frontend/src/app/modules/cozinha/cozinha-form/cozinha-form.component.html
mi g app angular detailsComponentTS editorName=Cozinha >  frontend/src/app/modules/cozinha/cozinha-form/cozinha-form.component.ts
mi g app angular listComponentHTML listName=Endereco >  frontend/src/app/modules/endereco/list-endereco/list-endereco.component.html
mi g app angular listComponentTS listName=Endereco >  frontend/src/app/modules/endereco/list-endereco/list-endereco.component.ts
mi g app angular detailsComponentHTML editorName=Endereco >  frontend/src/app/modules/endereco/endereco-form/endereco-form.component.html
mi g app angular detailsComponentTS editorName=Endereco >  frontend/src/app/modules/endereco/endereco-form/endereco-form.component.ts
mi g app angular listComponentHTML listName=Garcon >  frontend/src/app/modules/garcon/list-garcon/list-garcon.component.html
mi g app angular listComponentTS listName=Garcon >  frontend/src/app/modules/garcon/list-garcon/list-garcon.component.ts
mi g app angular detailsComponentHTML editorName=Garcon >  frontend/src/app/modules/garcon/garcon-form/garcon-form.component.html
mi g app angular detailsComponentTS editorName=Garcon >  frontend/src/app/modules/garcon/garcon-form/garcon-form.component.ts
mi g app angular listComponentHTML listName=ItemPedido >  frontend/src/app/modules/item-pedido/list-item-pedido/list-item-pedido.component.html
mi g app angular listComponentTS listName=ItemPedido >  frontend/src/app/modules/item-pedido/list-item-pedido/list-item-pedido.component.ts
mi g app angular detailsComponentHTML editorName=ItemPedido >  frontend/src/app/modules/item-pedido/item-pedido-form/item-pedido-form.component.html
mi g app angular detailsComponentTS editorName=ItemPedido >  frontend/src/app/modules/item-pedido/item-pedido-form/item-pedido-form.component.ts
mi g app angular listComponentHTML listName=Menu >  frontend/src/app/modules/menu/list-menu/list-menu.component.html
mi g app angular listComponentTS listName=Menu >  frontend/src/app/modules/menu/list-menu/list-menu.component.ts
mi g app angular detailsComponentHTML editorName=Menu >  frontend/src/app/modules/menu/menu-form/menu-form.component.html
mi g app angular detailsComponentTS editorName=Menu >  frontend/src/app/modules/menu/menu-form/menu-form.component.ts
mi g app angular listComponentHTML listName=Opcional >  frontend/src/app/modules/opcional/list-opcional/list-opcional.component.html
mi g app angular listComponentTS listName=Opcional >  frontend/src/app/modules/opcional/list-opcional/list-opcional.component.ts
mi g app angular detailsComponentHTML editorName=Opcional >  frontend/src/app/modules/opcional/opcional-form/opcional-form.component.html
mi g app angular detailsComponentTS editorName=Opcional >  frontend/src/app/modules/opcional/opcional-form/opcional-form.component.ts
mi g app angular listComponentHTML listName=Pagamento >  frontend/src/app/modules/pagamento/list-pagamento/list-pagamento.component.html
mi g app angular listComponentTS listName=Pagamento >  frontend/src/app/modules/pagamento/list-pagamento/list-pagamento.component.ts
mi g app angular detailsComponentHTML editorName=Pagamento >  frontend/src/app/modules/pagamento/pagamento-form/pagamento-form.component.html
mi g app angular detailsComponentTS editorName=Pagamento >  frontend/src/app/modules/pagamento/pagamento-form/pagamento-form.component.ts
mi g app angular listComponentHTML listName=Pedido >  frontend/src/app/modules/pedido/list-pedido/list-pedido.component.html
mi g app angular listComponentTS listName=Pedido >  frontend/src/app/modules/pedido/list-pedido/list-pedido.component.ts
mi g app angular detailsComponentHTML editorName=Pedido >  frontend/src/app/modules/pedido/pedido-form/pedido-form.component.html
mi g app angular detailsComponentTS editorName=Pedido >  frontend/src/app/modules/pedido/pedido-form/pedido-form.component.ts
mi g app angular listComponentHTML listName=Produto >  frontend/src/app/modules/produto/list-produto/list-produto.component.html
mi g app angular listComponentTS listName=Produto >  frontend/src/app/modules/produto/list-produto/list-produto.component.ts
mi g app angular detailsComponentHTML editorName=Produto >  frontend/src/app/modules/produto/produto-form/produto-form.component.html
mi g app angular detailsComponentTS editorName=Produto >  frontend/src/app/modules/produto/produto-form/produto-form.component.ts
mi g app angular listComponentHTML listName=TipoPagamento >  frontend/src/app/modules/tipo-pagamento/list-tipo-pagamento/list-tipo-pagamento.component.html
mi g app angular listComponentTS listName=TipoPagamento >  frontend/src/app/modules/tipo-pagamento/list-tipo-pagamento/list-tipo-pagamento.component.ts
mi g app angular detailsComponentHTML editorName=TipoPagamento >  frontend/src/app/modules/tipo-pagamento/tipo-pagamento-form/tipo-pagamento-form.component.html
mi g app angular detailsComponentTS editorName=TipoPagamento >  frontend/src/app/modules/tipo-pagamento/tipo-pagamento-form/tipo-pagamento-form.component.ts
mi g app json jsonClass entityName=CartaoConsumo > frontend/src/assets/dicionario/cartaoConsumo.json
mi g app json jsonClass entityName=Cliente > frontend/src/assets/dicionario/cliente.json
mi g app json jsonClass entityName=CadastroCliente > frontend/src/assets/dicionario/cadastroCliente.json
mi g app json jsonClass entityName=CartaoCliente > frontend/src/assets/dicionario/cartaoCliente.json
mi g app json jsonClass entityName=Categoria > frontend/src/assets/dicionario/categoria.json
mi g app json jsonClass entityName=Cozinha > frontend/src/assets/dicionario/cozinha.json
mi g app json jsonClass entityName=Endereco > frontend/src/assets/dicionario/endereco.json
mi g app json jsonClass entityName=Garcon > frontend/src/assets/dicionario/garcon.json
mi g app json jsonClass entityName=ItemPedido > frontend/src/assets/dicionario/itemPedido.json
mi g app json jsonClass entityName=Menu > frontend/src/assets/dicionario/menu.json
mi g app json jsonClass entityName=Opcional > frontend/src/assets/dicionario/opcional.json
mi g app json jsonClass entityName=Pagamento > frontend/src/assets/dicionario/pagamento.json
mi g app json jsonClass entityName=Pedido > frontend/src/assets/dicionario/pedido.json
mi g app json jsonClass entityName=Produto > frontend/src/assets/dicionario/produto.json
mi g app json jsonClass entityName=TipoPagamento > frontend/src/assets/dicionario/tipoPagamento.json
mi g app mean customQuery > backend/app/controllers/customQuery.util.js
mi g app mean checkIfDateIsOlder > backend/app/middleware/checkIfDateIsOlder.middleware.js
mi g app json jsonTransloco translate=en > frontend/src/assets/i18n/en.json
mi g app json jsonTransloco translate=pt > frontend/src/assets/i18n/pt.json
mi g app angular environment > frontend/src/enviroment/environment.ts
mi g app json jsonMenu > frontend/src/assets/dicionario/menu.json
