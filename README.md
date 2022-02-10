# Cadastro de carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**RNF** => Requisitos não funcionais

**RN** =>
Não deve ser possível cadastrar um carro com uma placa que já estiver cadastrada.
Ao cadastrar um carro, o mesmo deve estar disponível por padrão.
Somente o usuário com perfil de administrador poderá cadastrar um carro.

# Listagem de carros

**RF**
Deve ser possível listar os carros disponíveis.
Deve ser possível listar carros disponíveis pelo nome do carro
Deve ser possível listar carros disponíveis pela marca
Deve ser possível listar carros disponíveis pela categoria

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação se já existir uma para o carro.
Somente o usuário com perfil de administrador poderá cadastrar uma especificação.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário administrador

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 hora
Não deve ser possível cadastrar um aluguel se já existir um aberto para o mesmo carro
Não deve ser possível cadastrar um aluguel se já existir um aberto para o mesmo usuário
O Usuário deve estar logado na aplicação
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

# Devolução de carro

**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para realizar outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
