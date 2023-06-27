import {
  CategoryOutput,
  ListCategoriesUseCase,
} from '@core/api/category/application';
import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../../@share/presenters/collection.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string | null;
  @ApiProperty()
  is_active: boolean;
  @Transform(({ value }) => value.toISOString())
  @ApiProperty()
  created_at: Date;

  constructor(output: CategoryOutput) {
    this.id = output.id;
    this.name = output.name;
    this.description = output.description;
    this.is_active = output.is_active;
    this.created_at = output.created_at;
  }
}

export class CategoryCollectionPresenter extends CollectionPresenter {
  @ApiProperty({ type: [CategoryPresenter] })
  data: CategoryPresenter[];
  //sugestão de reuso
  // constructor(output: CategoryOutput[], paginationProps){

  // }

  constructor(output: ListCategoriesUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new CategoryPresenter(item));
  }
}
