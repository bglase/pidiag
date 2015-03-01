#!/usr/bin/python -u

import time

def out(*args):
  print "%f %f %f %f %f %f %f %f %f %f" % args

# Origin
while True:
  out( 0.8071067811865476, 0, -0.7071067811865476, 0,  1, 0, 0,  1, 0, 1); #a=90
  time.sleep(1)
  out( 0.8071067811865476, 0, 0, 0.7071067811865476,  1, 0, 0,  1, 0, 1 ); #b=90
  time.sleep(1)
  out( 0.8071067811865476, 0.7071067811865476 , 0, 0,  1, 0, 0,  1, 0, 1 ); #c=90
  time.sleep(1)

  # out(1, 0, 0, 0,  1, 0, 0,  1, 0, 1)
  # time.sleep(1)
  # out(0, 1, 0, 0,  1, 0, 0,  1, 0, 1 )
  # time.sleep(1)
  # out(0, 0, 1, 0,  1, 0, 0,  1, 0, 1 )
  # time.sleep(1)
  # out(0, 0, 0, 1,  1, 0, 0,  1, 0, 1 )
  # time.sleep(1)
 
 #   out(1, 0, 0,  0, 1, 0,  0, 1, 0,  1, 1, 1,  -1, 1, 1)
 # time.sleep(3)
 # out(1, 0, 0,  0, 1, -0.2,  0, 0.2, 1,  1, 1, 1,  -1, 1, 1)
 # time.sleep(0.3)