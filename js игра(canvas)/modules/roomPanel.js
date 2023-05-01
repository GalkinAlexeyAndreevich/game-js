const RoomSearch = document.querySelector(".RoomSearch")
export const roomPanel = (socket)=>{
    console.log(socket);
    const roomsDiv = RoomSearch.querySelector(".rooms")
    socket.on("getRooms",(rooms)=>{
      console.log("Получили");
      console.log(rooms);
      roomsDiv.innerHTML = ""
      
      for(let i=0; i<rooms.length;i++){
        if(rooms[i].close){
          continue
        }
        const form = document.createElement("form")
        form.innerHTML = `
          <p>Комната №${i} Socket ${rooms[i].p1}</p>
          <button class="accept"> Присоединиться </button>
        `
        if(rooms[i].p1 == socket.id){
          form.innerHTML = `
            <p>Комната №${i} Socket ${rooms[i].p1} (Ваша заявка)</p>
            <button class="accept" disabled> Присоединиться </button>
          `
        }
        form.addEventListener("submit",(e)=>{
          e.preventDefault()
  
          console.log(`Присоединился к комнате ${i}`);
          socket.emit("joinRoom",i)
        })
        roomsDiv.append(form)
      }
    })
    const addRoom = RoomSearch.querySelector(".addRoom")
    addRoom.addEventListener("click",()=>{
      let check = false
      socket.emit("checkInRoom")
      socket.on("answerOnCheck",()=>{
        check = true
        alert("Вы уже добавили комнату")
      })
      if(check){
        return
      }
      socket.emit("addRoom")
    })
  }