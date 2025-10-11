import { X } from 'lucide-react';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="flex w-full max-w-[13.625rem] items-center justify-between">
          <a href="#">PLPB</a>
          <button className="border-border rounded border p-1">
            <X className="bg-secondary rounded-full p-1" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
