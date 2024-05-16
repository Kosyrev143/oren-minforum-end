import axios from 'axios';

const exportUsersToExcel = async () => {
	try {
		// Отправляем GET-запрос по указанному URL
		const response = await axios.get('http://localhost:5000/api/user/export/users', {
			responseType: 'arraybuffer',
		});

		// Создаем ссылку для скачивания файла
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'users.xlsx');
		document.body.appendChild(link);
		link.click();
	} catch (error) {
		console.error('Ошибка при экспорте в Excel:', error);
	}
};

const exportEventsToExcel = async () => {
	try {
		// Отправляем GET-запрос по указанному URL
		const response = await axios.get('http://localhost:5000/api/event/export/events', {
			responseType: 'arraybuffer',
		});

		// Создаем ссылку для скачивания файла
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'events.xlsx');
		document.body.appendChild(link);
		link.click();
	} catch (error) {
		console.error('Ошибка при экспорте в Excel:', error);
	}
};

const AdminPanel = () => {
	return (
		<div>
			<h1>Административная панель</h1>
			<br/>
			<br/>
			<div>
				<button onClick={exportUsersToExcel}>Выгрузить пользователей</button>
			</div>
			<br/>
			<div>
				<button onClick={exportEventsToExcel}>Выгрузить события</button>
			</div>
			<br/>
		</div>
	);
};

export default AdminPanel;
