const state = {
  onClick: null,
  tickId: null,
};

function mountView() {
  const btn = document.getElementById('save');
  state.onClick = () => {/* ... */};
  btn.addEventListener('click', state.onClick);

  state.tickId = setInterval(() => {/* ... */}, 1000);
}

function unmountView() {
  const btn = document.getElementById('save');
  if (state.onClick) btn.removeEventListener('click', state.onClick);
  if (state.tickId) clearInterval(state.tickId);
  state.onClick = null;
  state.tickId = null;
}
