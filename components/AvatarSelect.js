import range from 'lodash/range';

export default function AvatarSelect({ handleSelectAvatar, close }) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#efefef',
          opacity: 0.6,
        }}
        onClick={close}
      />
      <div
        style={{
          position: 'absolute',
          top: '150px',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '400px',
          margin: 'auto',
          padding: '2rem',
          backgroundColor: '#fff',
        }}
      >
        {range(1, 11).map((avatarNumber) => (
          <img
            alt="choosen avatar picture"
            key={`avatar-${avatarNumber}`}
            src={`/avatars/${avatarNumber}.svg`}
            style={{ height: '100px', cursor: 'pointer', margin: '0.5rem' }}
            onClick={() => handleSelectAvatar(avatarNumber)}
          />
        ))}
      </div>
    </>
  );
}
