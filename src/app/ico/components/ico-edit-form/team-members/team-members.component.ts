import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as R from 'ramda';


@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

  @Input() team;
  @Output() changeTeam: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  membersForm: FormGroup;
  items: any = [];

  constructor(private formBuilder: FormBuilder, private dragula: DragulaService) { }

  ngOnInit() {
    this.membersForm = this.formBuilder.group({ items: this.formBuilder.array([]) });
    this.membersForm.valueChanges.subscribe(() => this.getTeam());

    this.dragula.drop.subscribe(() => {
      this.items.at(0).get('name').setValue(this.items.at(0).get('name').value); //hot fix for update form items index
    });

    this.items = this.membersForm.get('items') as FormArray;
    this.team && this.team.lenght > 0 ? this.loadTeam() : this.items.push(this.createItem());
  }

  loadTeam() {
    const sortTeam = R.sortWith([R.ascend(R.prop('order'))])(this.team);

    sortTeam.map((item) => {
      this.items.push(this.formBuilder.group({
        id: item.id || null,
        name: item.name || '',
        role: item.role || '',
        action: item.action || null
      }));
    });
  }

  getTeam() {
    let { items } = this.membersForm.value;
    const sortNewTeam = items.map((item, index) => { item.order = index + 1; return item; });
    let _team = [];

    const _new = sortNewTeam.filter((item) => !item.id);
    const _deleted = this.team.filter((item) => item.delete);

    this.team.map((item) => {
      sortNewTeam.map((itemN, index) => {
        if (item.id == itemN.id) _team.push(R.mergeDeepRight(item, itemN));
      });
    });

    this.changeTeam.emit(R.sortWith([R.ascend(R.prop('order'))])(R.concat(R.concat(_team, _deleted), _new)));
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      id: null,
      name: '',
      role: '',
      action: null
    });
  }

  addItem() {
    this.items.push(this.createItem());
  }

  deleteItem(index) {
    const { id } = this.items.controls[index].value;
    id && this.deleteTeamMember(id);

    this.items.removeAt(index);
  }

  deleteTeamMember(id) {
    const index = R.findIndex(R.propEq('id', id))(this.team);
    this.team[index]['delete'] = true;
  }
}
