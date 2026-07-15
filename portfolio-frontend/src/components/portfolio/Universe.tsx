import React from 'react';
import './universe.css';

export function Universe() {
  return (
    <div className="w-full h-[400px] md:h-[600px] relative overflow-hidden flex items-center justify-center">
      <div className="universe">
  <div className="orbit moon"></div>
  <div className="orbit mercury"></div>
  <div className="orbit venus"></div>
  <div className="orbit sun"></div>
  <div className="orbit mars"></div>
  <div className="orbit jupiter"></div>
  <div className="orbit saturn"></div>
  <div className="orbit stars">
    <div className="star" style={{ "--j": 0, "--y": .1 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 1, "--y": .5 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 2, "--y": .2 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 3, "--y": .1 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 4, "--y": .6 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 5, "--y": .2 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 6, "--y": .9 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 7, "--y": .4 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 8, "--y": .3 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 9, "--y": .5 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 10, "--y": .3 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 11, "--y": .4 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 12, "--y": .7 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 13, "--y": .8 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 14, "--y": .1 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 15, "--y": .2 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 16, "--y": .9 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 17, "--y": .4 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 18, "--y": .3 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 19, "--y": .5 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 20, "--y": .9 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 21, "--y": .2 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 22, "--y": .6 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 23, "--y": .2 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 24, "--y": .8 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 25, "--y": .7 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 26, "--y": .1 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 27, "--y": .3 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 28, "--y": .4 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 29, "--y": .7 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 30, "--y": .8 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 31, "--y": .3 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 32, "--y": .4 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 33, "--y": .7 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 34, "--y": .8 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 35, "--y": .1 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 36, "--y": .2 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 37, "--y": .9 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 38, "--y": .4 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 39, "--y": .3 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 40, "--y": .2 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 41, "--y": .8 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 42, "--y": .7 } as React.CSSProperties}></div>
    <div className="star" style={{ "--j": 43, "--y": .1 } as React.CSSProperties}></div>
  </div>
  <div className="body-container earth">
    <div className="human-lights"></div>
  </div>
  <div className="body-container moon">
    <div className="crater crater-1"></div>
    <div className="crater crater-2"></div>
    <div className="crater crater-3"></div>
    <div className="crater crater-4"></div>
    <div className="crater crater-5"></div>
    <div className="crater crater-6"></div>
  </div>
  <div className="body-container mercury">
    <div className="crater crater-1"></div>
    <div className="crater crater-2"></div>
    <div className="crater crater-3"></div>
    <div className="crater crater-4"></div>
    <div className="crater crater-5"></div>
    <div className="crater crater-6"></div>
    <div className="crater crater-7"></div>
    <div className="crater crater-8"></div>
    <div className="crater crater-9"></div>
    <div className="crater crater-10"></div>
    <div className="crater crater-11"></div>
    <div className="crater crater-12"></div>
    <div className="crater crater-13"></div>
    <div className="crater crater-14"></div>
    <div className="crater crater-15"></div>
    <div className="crater crater-16"></div>
  </div>
  <div className="body venus"></div>
  <div className="body sun"></div>
  <div className="body-container mars">
    <div className="ice-cap"></div>
  </div>
  <div className="body jupiter"></div>
  <div className="body-container saturn">
    <div className="ring-far a"></div>
    <div className="ring-far b"></div>
    <div className="shadow"></div>
    <div className="body-copy"></div>
    <div className="storms">
      <div className="storm"></div>
      <div className="storm"></div>
      <div className="storm"></div>
    </div>
  </div>
  <div className="body-container nebula">
    <div className="part a"></div>
    <div className="part b"></div>
    <div className="body-copy"></div>
  </div>
  <div className="body-container galaxy">
    <div className="arms">
      <div className="arm">
        <div className="arm-depth" style={{ "--d": 0 } as React.CSSProperties}>
          <div className="arm-depth" style={{ "--d": 1 } as React.CSSProperties}>
            <div className="arm-depth" style={{ "--d": 2 } as React.CSSProperties}>
              <div className="arm-depth" style={{ "--d": 3 } as React.CSSProperties}>
                <div className="arm-depth" style={{ "--d": 4 } as React.CSSProperties}>
                  <div className="arm-depth" style={{ "--d": 5 } as React.CSSProperties}>
                    <div className="arm-depth" style={{ "--d": 6 } as React.CSSProperties}>
                                                    </div>
                                                  </div>
                                               </div>
                                            </div>
                                      </div>
                              </div>
                    </div>
      </div>
      <div className="arm">
        <div className="arm-depth" style={{ "--d": 0 } as React.CSSProperties}>
          <div className="arm-depth" style={{ "--d": 1 } as React.CSSProperties}>
            <div className="arm-depth" style={{ "--d": 2 } as React.CSSProperties}>
              <div className="arm-depth" style={{ "--d": 3 } as React.CSSProperties}>
                <div className="arm-depth" style={{ "--d": 4 } as React.CSSProperties}>
                  <div className="arm-depth" style={{ "--d": 5 } as React.CSSProperties}>
                    <div className="arm-depth" style={{ "--d": 6 } as React.CSSProperties}>
                                                    </div>
                                                  </div>
                                               </div>
                                            </div>
                                      </div>
                              </div>
                    </div>
      </div>
    </div>
    <div className="body-copy"></div>
  </div>
</div>
    </div>
  );
}
