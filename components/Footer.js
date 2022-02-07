import Image from 'next/image'

export default function Footer() {

  const getYear = () => {
    return new Date().getFullYear();
  }

  return (
    <div className="px-10 py-8 md:px-20 flex align-middle justify-between md:justify-end">
      <h4 className="mr-8 py-2">&copy; Stephen Herd {getYear()}</h4>
      <a className="mr-8 w-10" href="https://www.linkedin.com/in/stephen-herd/" target="_blank" rel="noreferrer"><Image width={10} height={10} layout='responsive' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDM4MiAzODIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4MiAzODI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiMwMDc3Qjc7IiBkPSJNMzQ3LjQ0NSwwSDM0LjU1NUMxNS40NzEsMCwwLDE1LjQ3MSwwLDM0LjU1NXYzMTIuODg5QzAsMzY2LjUyOSwxNS40NzEsMzgyLDM0LjU1NSwzODJoMzEyLjg4OQ0KCUMzNjYuNTI5LDM4MiwzODIsMzY2LjUyOSwzODIsMzQ3LjQ0NFYzNC41NTVDMzgyLDE1LjQ3MSwzNjYuNTI5LDAsMzQ3LjQ0NSwweiBNMTE4LjIwNywzMjkuODQ0YzAsNS41NTQtNC41MDIsMTAuMDU2LTEwLjA1NiwxMC4wNTYNCglINjUuMzQ1Yy01LjU1NCwwLTEwLjA1Ni00LjUwMi0xMC4wNTYtMTAuMDU2VjE1MC40MDNjMC01LjU1NCw0LjUwMi0xMC4wNTYsMTAuMDU2LTEwLjA1Nmg0Mi44MDYNCgljNS41NTQsMCwxMC4wNTYsNC41MDIsMTAuMDU2LDEwLjA1NlYzMjkuODQ0eiBNODYuNzQ4LDEyMy40MzJjLTIyLjQ1OSwwLTQwLjY2Ni0xOC4yMDctNDAuNjY2LTQwLjY2NlM2NC4yODksNDIuMSw4Ni43NDgsNDIuMQ0KCXM0MC42NjYsMTguMjA3LDQwLjY2Niw0MC42NjZTMTA5LjIwOCwxMjMuNDMyLDg2Ljc0OCwxMjMuNDMyeiBNMzQxLjkxLDMzMC42NTRjMCw1LjEwNi00LjE0LDkuMjQ2LTkuMjQ2LDkuMjQ2SDI4Ni43Mw0KCWMtNS4xMDYsMC05LjI0Ni00LjE0LTkuMjQ2LTkuMjQ2di04NC4xNjhjMC0xMi41NTYsMy42ODMtNTUuMDIxLTMyLjgxMy01NS4wMjFjLTI4LjMwOSwwLTM0LjA1MSwyOS4wNjYtMzUuMjA0LDQyLjExdjk3LjA3OQ0KCWMwLDUuMTA2LTQuMTM5LDkuMjQ2LTkuMjQ2LDkuMjQ2aC00NC40MjZjLTUuMTA2LDAtOS4yNDYtNC4xNC05LjI0Ni05LjI0NlYxNDkuNTkzYzAtNS4xMDYsNC4xNC05LjI0Niw5LjI0Ni05LjI0Nmg0NC40MjYNCgljNS4xMDYsMCw5LjI0Niw0LjE0LDkuMjQ2LDkuMjQ2djE1LjY1NWMxMC40OTctMTUuNzUzLDI2LjA5Ny0yNy45MTIsNTkuMzEyLTI3LjkxMmM3My41NTIsMCw3My4xMzEsNjguNzE2LDczLjEzMSwxMDYuNDcyDQoJTDM0MS45MSwzMzAuNjU0TDM0MS45MSwzMzAuNjU0eiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" /></a>
      <a className="w-10" href="https://github.com/stephenh369" target="_blank" rel="noreferrer"><Image width={10} height={10} layout='responsive' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjU2OC4wMzRweCIgaGVpZ2h0PSI1NjguMDM0cHgiIHZpZXdCb3g9IjAgMCA1NjguMDM0IDU2OC4wMzQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2OC4wMzQgNTY4LjAzNDsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik01NTAuOTksMEgxNy4wNTFDOC45NDgsMCwyLjM4MSw2LjU2NywyLjM4MSwxNC42N3Y1MzguNjk0YzAsOC4xMDQsNi41NjcsMTQuNjcsMTQuNjcsMTQuNjdoMTc3LjQ5OHYtMC4xMjkNCgkJCWM4LjAxMS0wLjA5MiwxNC4xNDktNC41NzcsMTQuNDMxLTEyLjE2NmMwLjcyOC0xOS43MjUsMC4yMTQtMzkuNDkyLDAuMjE0LTU4LjU2MmMtMTQuMjk2LDAuNjY3LTI3Ljk0NCwyLjQ3My00MS40MzgsMS42OTUNCgkJCWMtMjkuNzYyLTEuNzE0LTUyLjYzMi0xNC40MTMtNjQuNDkzLTQzLjU1NmMtNy4wMjYtMTcuMjY1LTE3LjYxMy0zMi4wMzItMzQuMTAxLTQxLjg4NmMtMy4wNzktMS44NDItNS43NzEtNC41NTQtOC4xMjctNy4zMDgNCgkJCWMtMy4wNzktMy41OTItMi41MDMtNy4yODIsMi4zNjItOC4yNjhjNC45MDgtMC45OTgsMTAuMjctMS42OTUsMTUuMTEtMC43OWMxOS4wMDksMy41NjgsMzIuMTU0LDE1LjQ5LDQyLjIxNiwzMS4zNDcNCgkJCWMxOS44OTYsMzEuMzcxLDUwLjUyMSw0MC45NzQsODQuOTc2LDI2LjQ4N2MxLjkyMS0wLjgwOCw0LjM2My0yLjc2Niw0LjcyNS00LjU1M2MyLjc3OC0xMy44ODcsNy45NjgtMjYuNTQ5LDE4LjQyNy0zNy42NQ0KCQkJYy0xMS42MjgtMi4xNTQtMjIuMzk5LTMuNzM5LTMyLjk2Mi02LjE4OGMtMzAuNDE3LTcuMDM4LTU3Ljc0Mi0xOS43LTc3LjcyNC00NC44NDhjLTE2LjMwMy0yMC41MTQtMjMuNzU4LTQ0LjUyOC0yNy4xODUtNzAuMDg2DQoJCQljLTUuMzY3LTQwLjAzMS0wLjU2My03Ny41MDMsMjYuOTI4LTEwOS40OTNjMS4zODktMS42MTYsMi4xNDItNC45MjcsMS41MjQtNi45NGMtNi44ODUtMjIuNDk3LTUuODMzLTQ0LjgwNSwwLjk5MS02Ny4wNTENCgkJCWMzLjU4MS0xMS42ODMsNC41NzgtMTIuMjY1LDE2LjUtMTAuNjM3YzAuNzI5LDAuMDk4LDEuNDM4LDAuMjgxLDIuMTYxLDAuNDA0YzIzLjg5OCwzLjk1NCw0NC40NjgsMTUuNTI2LDY0LjczMSwyNy45NQ0KCQkJYzIuNzI0LDEuNjcxLDYuODczLDIuNzExLDkuODY2LDEuOTgzYzQ4LjM5Ny0xMS43NDQsOTYuNzAyLTExLjY5NSwxNDUuMDkzLDAuMDQzYzIuODA5LDAuNjc5LDYuNTYxLTAuMjg4LDkuMjQ3LTEuNjk1DQoJCQljMTEuMDE2LTUuNzU5LDIxLjU2MS0xMi40NTQsMzIuNzE4LTE3LjkxNGMxMi45OC02LjM0NiwyNi42NTItMTEuMTIsNDEuMzcxLTEwLjg1N2MyLjU3NiwwLjA0OSw2LjU2MSwyLjUwOSw3LjQyMyw0Ljc4Ng0KCQkJYzguODU2LDIzLjQ2NCwxMC43MjMsNDcuMzc1LDMuNjY2LDcxLjc5NGMtMC43NTMsMi42MDcsMC4zNjcsNi4zMjIsMS43NjksOC44OTJjNi45NjUsMTIuNzc5LDE2LjY4OSwyNC41NzIsMjEuMDk2LDM4LjEyNw0KCQkJYzEzLjQzNCw0MS4zMTYsOC41MzgsODIuMjI5LTkuNzQ5LDEyMS4wNmMtMTYuNzU3LDM1LjU5NC00Ny44MzQsNTMuNjMtODQuNjIxLDYyLjkzM2MtMTIuNDI0LDMuMTQtMjUuMTUzLDUuMDQ5LTM4LjU1Niw3LjY4MQ0KCQkJYzE3LjU2NCwxOC4zNDgsMjAuMzE4LDQwLjc0LDIwLjAwNiw2NC4xOTJjLTAuMzI0LDI0LjE5Mi0wLjIzOCw0OC4zOTEtMC4yNTEsNzIuNTg5Yy0wLjAwNiwxMS43Miw1LjExLDE4LjE5NSwxNC4wMzksMTguNTc0DQoJCQljLTAuMDA2LDAuMDM3LDE4OC43MjMsMC4wMzcsMTg4LjcyMywwLjAzN1YxNC42N0M1NjUuNjUzLDYuNTY3LDU1OS4wODcsMCw1NTAuOTksMHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" /></a>
    </div>
  )
}