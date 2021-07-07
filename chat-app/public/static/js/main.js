var socket = io.connect(window.location.host)

var output = document.querySelector(".message-space");
var send = document.querySelector(".send");
var hello = document.querySelector(".message");




send.addEventListener('click', () => {
  if(hello.value.length.trim() == 0){return null}
  socket.emit("chat", {
    message : hello.value,
    handle : "daat",
  })
  hello.value = ""
  console.log(window.location.host)
})

socket.on("chat", (data) => {
  console.log(data)
  output.innerHTML += '<div class="hello"><p>' + data.message +  '</p><span class="time-right">' + data.person + '</span></div><br>'
})


hello.addEventListener('keydown', function(e) {
  if (e.keyCode == 13) {
      socket.emit("chat", {
        message : hello.value,
        handle : "daat",
      })
      hello.value = ""
      console.log(window.location.host)
  }
})