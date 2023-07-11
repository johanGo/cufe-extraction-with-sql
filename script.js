const inputArchivo = document.querySelector('#archivoXML');
let nameProvider = document.querySelector('#nameProvider');
let cufeProvider = document.querySelector('#cufeProvider');
let codeProvider = document.querySelector('#codeProvider');
let copyBtn = document.querySelector('#copy-btn');
let btnMySql = document.querySelector('#btn-mysql');


inputArchivo.addEventListener('change', (evento) => {
	const archivo = evento.target.files[0];
	const lector = new FileReader();
	lector.readAsText(archivo);
			
	lector.onload = (eventoLector) => {
		const contenidoXML = eventoLector.target.result;

		//1 Expresión regular para extraer el CUFE
		const tagCUFE = 'cbc:UUID';
		const regexCUFE = new RegExp(`<${tagCUFE}\\b[^>]*>(.*?)<\\/\\s*${tagCUFE}\\s*>`, 's');	

		//2 Expresion regular para extraer el nombre del proveedor
		const tagName= 'cbc:RegistrationName';
		const regexName=new RegExp(`<${tagName}\\b[^>]*>(.*?)<\\/\\s*${tagName}\\s*>`, 's');
		
        //3 Expresion regular para extraer el nombre del codigo
		const tagCodigo= 'cbc:ParentDocumentID';
		const regexCodigo=new RegExp(`<${tagCodigo}\\b[^>]*>(.*?)<\\/\\s*${tagCodigo}\\s*>`, 's');

		//1 Buscar el CUFE en el contenido del archivo XML
		const resultadoCUFE = regexCUFE.exec(contenidoXML);

		//2 Buscar el Nombre del proveedor en el contenido XML
		const resultadoName= regexName.exec(contenidoXML);

        //3 Buscar el codigo en el contenido XML
		const resultadoCodigo= regexCodigo.exec(contenidoXML);
        
		// console.log(`EL CUFE ES: ${resultadoCUFE[1]}`);
		// console.log(`EL CODIGO ES: ${resultadoCodigo[1]}`);
		// console.log(`EL CODIGO ES: ${resultadoCodigo}`);
		console.log(`${resultadoCUFE[1].length}`);
		console.log(typeof `${resultadoCUFE[1]}`);
        


		if (resultadoCUFE !== null || undefined && resultadoName!== null || undefined && resultadoCUFE[1].length==96) {
			// console.log(`EL CUFE ES: ${resultadoCUFE[1]}`);
			// console.log(`El nombre del proovedor es: ${resultadoName[1]}`)
			nameProvider.value=resultadoName[1];
			cufeProvider.value=resultadoCUFE[1];
			codeProvider.value=resultadoCodigo[1];

			console.log(cufeProvider.value);


			copyBtn.addEventListener('click', (event)=>{
				event.preventDefault();
				navigator.clipboard.writeText(resultadoCUFE[1])				
					.then(()=>{
						Swal.fire({
							icon:'success',
							title:'Texto Copiado',
							text:'',		
							showConfirmButton: false,				
							timer:1500,
							timerProgressBar: true
						})										
					})
					.catch(err =>{
						Swal.fire({
							icon:'error',
							title:'Opss...',
							text:'Algo salio mal',		
							showConfirmButton: false,				
							timer:2000
						})		
						console.error('Error al copiar el texto: ', err);
					});												
			});	


		}else{			
			Swal.fire({
				icon:'error',
				title:'Opss...',
				text:'Hay un problema con algun dato del xml, revisalo',		
				showConfirmButton: false,				
				timer:3000
			})
			// alert('Hay un problema con algun dato del xml, revisalo')
			// console.log(`No se encontró el valor dentro del elemento ${tagCUFE}`);
			// console.log(`No se encontró el valor dentro del elemento ${tagName}`);
		};			
	};		
});

copyBtn.addEventListener('click', (e)=>{
	e.preventDefault();
	if(nameProvider.textContent === ''){
		Swal.fire({
			icon:'warning',
			title:'Opss...',
			text:'Esta vacio el campo',		
			showConfirmButton: false,				
			timer:1500
		})
	};
});

setInterval(function(){
	location.reload();
},600000);
