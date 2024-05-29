import axios from "axios";
import styles from "./AdminPanel.module.css";

const exportUsersToExcel = async () => {
  try {
    // Отправляем GET-запрос по указанному URL
    const response = await axios.get(
      "http://localhost:5000/api/user/export/users",
      {
        responseType: "arraybuffer",
      }
    );

    // Создаем ссылку для скачивания файла
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.xlsx");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Ошибка при экспорте в Excel:", error);
  }
};

const exportEventsToExcel = async () => {
  try {
    // Отправляем GET-запрос по указанному URL
    const response = await axios.get(
      "http://localhost:5000/api/event/export/events",
      {
        responseType: "arraybuffer",
      }
    );

    // Создаем ссылку для скачивания файла
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "events.xlsx");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Ошибка при экспорте в Excel:", error);
  }
};

const AdminPanel = () => {
  return (
    <div>
      <h1>Административная панель</h1>
      <div className={styles.modalItemInput}>
        <input
          className={styles.modalInput}
          type="text"
          placeholder="Login"
          onChange={(e) => setSeName(e.target.value)}
        />
      </div>
      <div className={styles.modalItemInput}>
        <input
          className={styles.modalInput}
          type="password"
          placeholder="Password"
          onChange={(e) => setSeName(e.target.value)}
        />
      </div>
      <button
        className={styles.modalButton}
        onClick={(e) => {
          if (handleSubmit()) {
            addNewUsers();
            handleButtonClick();
            e.preventDefault();
            // window.location.href = "/";
          }
        }}
      >
        Войти
      </button>

      {/* <div>
        <button onClick={exportUsersToExcel}>Выгрузить пользователей</button>
      </div>
      
      <div>
        <button onClick={exportEventsToExcel}>Выгрузить события</button>
      </div> */}
    </div>
  );
};

export default AdminPanel;
