import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const WelcomeMessage = () => {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="win-bevel max-w-md gap-2 rounded-none border-0 bg-[#c0c0c0] p-0 text-center shadow-[4px_4px_0_#000] sm:rounded-none [&>button.absolute]:hidden">
        <div className="flex items-center justify-between bg-primary px-2 py-1 text-left text-primary-foreground">
          <span className="font-bold">thefaceboock.exe — Welcome</span>
          <button type="button" onClick={() => setOpen(false)} className="retro-btn px-1 leading-none" aria-label="Cerrar">X</button>
        </div>
        <DialogHeader className="space-y-2 px-4 pb-2 pt-3">
          <div className="text-5xl">🎅🎄🎁</div>
          <DialogTitle className="text-center text-xl font-bold text-primary neon-pulse">
            ¡Feliz Navidad y Próspero Año Nuevo!
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-foreground">
            Que la magia de estas fiestas llene tu hogar de alegría ✨
            <br />
            <span className="rainbow-text text-base">~*~ Y2K Edition ~*~</span>
          </DialogDescription>
        </DialogHeader>
        <div className="px-4 pb-4">
          <button onClick={() => setOpen(false)} className="retro-btn mx-auto block px-6 py-1 font-semibold">
            Ver regalos 🎁
          </button>
          <p className="mt-2 text-[10px] text-muted-foreground">Click OK to enter my homepage</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default WelcomeMessage;
