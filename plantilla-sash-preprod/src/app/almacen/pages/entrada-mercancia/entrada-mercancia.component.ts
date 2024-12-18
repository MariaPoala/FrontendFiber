import { Component, OnInit, ViewChild } from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {FormBuilder, Validators} from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Subject} from "rxjs";

@Component({
  selector: 'app-entrada-mercancia',
  templateUrl: './entrada-mercancia.component.html',
  styleUrls: ['./entrada-mercancia.component.scss']
})
export class EntradaMercanciaComponent implements OnInit {
  public static spanish_datatables = {
    processing: "Procesando...",
    search: "Buscar:",
    lengthMenu: "Mostrar _MENU_ elementos",
    info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
    infoEmpty: "Mostrando ningún elemento.",
    infoFiltered: "(filtrado _MAX_ elementos total)",
    infoPostFix: "",
    loadingRecords: "Cargando registros...",
    zeroRecords: "No se encontraron registros",
    emptyTable: "No hay datos disponibles en la tabla",
    buttons: {
      copy: "Copiar",
      colvis: "Visibilidad",
      collection: "Colección",
      colvisRestore: "Restaurar visibilidad",
      copyKeys: "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
      copySuccess: {
        1: "Copiada 1 fila al portapapeles",
        _: "Copiadas %ds fila al portapapeles"
      },
      copyTitle: "Copiar al portapapeles",
      csv: "CSV",
      excel: "Excel",
      pageLength: {
        1: "Mostrar todas las filas",
        _: "Mostrar %d filas"
      },
      pdf: "PDF",
      print: "Imprimir",
      renameState: "Cambiar nombre",
      updateState: "Actualizar",
      createState: "Crear Estado",
      removeAllStates: "Remover Estados",
      removeState: "Remover",
      savedStates: "Estados Guardados",
      stateRestore: "Estado %d"
    },
    paginate: {
      first: "Primero",
      previous: "Anterior",
      next: "Siguiente",
      last: "Último"
    },
    aria: {
      sortAscending: ": Activar para ordenar la tabla en orden ascendente",
      sortDescending: ": Activar para ordenar la tabla en orden descendente"
    }
  }

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(private modalService: NgbModal, private fb: FormBuilder,) { }
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();

  formReserva = this.fb.group({
    categoria: [null, Validators.required],
    u_medida: [null, Validators.required],
    color: [null, Validators.required],
    codigo: ['COD-001', Validators.required],
    nombre: ['TELA JEAN AMARILLO', Validators.required],
    metros: ['', Validators.required]
  })

  montosProyeccion:any=[]
  categoria:any
  u_medida:any
  tipo_stock:any
  color:any

  ngOnInit(): void {
    this.init()
  }

  init(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      lengthMenu: [5, 10, 25],
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        { extend: 'pdfHtml5', className: 'btn btn-primary text-white', title:'Entrada Productos'},
        { extend: 'copy', className: 'btn btn-primary text-white', title:'Entrada Productos'},
        { extend: 'print', className: 'btn btn-danger text-white', title:'Entrada Productos'},
        { extend: 'excelHtml5', className: 'btn btn-success text-white', title:'Entrada Productos'}
      ],
      language: EntradaMercanciaComponent.spanish_datatables
    }
    this.montosProyeccion=[
      {
        cod: 'COD-001',
        nombre: 'TELA JEAN',
        cantidad: '120',
        unit: '12000',
        total: '50000',
      }
    ]
    this.dtTrigger.next();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  openModal(modal:any){
    this.modalService.open(modal, {centered: true, windowClass: 'animate__animated animate__backInUp', size: 'md' });
  }

  agregar(){

  }
}
