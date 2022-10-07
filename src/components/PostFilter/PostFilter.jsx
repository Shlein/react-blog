import React from 'react';
import MyInput from "../../UI/MyInput/MyInput";
import MySelect from "../../UI/mySelect/MySelect";

const PostFilter = ({filter, setFilter}) => {
	return (
		<React.Fragment>
			<MyInput
				placeholder='Поиск по постам...'
				value={filter.search}
				onChange={(e) => {
					setFilter({...filter, search: e.target.value});
				}}
			/>

			<MySelect
				onChange={(sort) => {
					setFilter({...filter, sort: sort})
				}}
				defaultValue='Сортировка'
				options = {
					[
						{value: 'title', text: 'Сортировка по названию'},
						{value: 'body', text: 'Сортировка по описанию'},
					]
				}
			/>
		</React.Fragment>
	);
};

export default PostFilter;